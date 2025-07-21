import {google} from '@ai-sdk/google';
import {createDataStreamResponse, streamObject} from 'ai';
import {generateSystemPrompt, languageHeader} from "@/data/systemPrompt";
import {getSchema} from "@/data/schema";
import {v4} from "uuid";

const models = [
    google('gemini-2.5-flash'),
    google('gemini-2.5-pro'),
    google('gemini-2.5-flash-lite-preview-06-17'),
    google('gemini-2.0-flash'),
    google('gemini-2.0-flash-lite')
]

export const maxDuration = 30;

export async function POST(req: Request) {
    const {messages} = await req.json();

    for (const model of models) {
        const result = new Promise(resolve => {
            const response = createDataStreamResponse({
                execute: async dataStream => {
                    try {
                        const result = streamObject({
                            model,
                            onError: e => {
                                console.error(model, e)
                                resolve(null)
                            },
                            system: generateSystemPrompt(req.headers.get(languageHeader) || "Deutsch"),
                            schema: getSchema(),
                            providerOptions: {
                                groq: {
                                    reasoningFormat: "hidden",
                                }
                            },
                            messages,
                        });
                        let i = 0;
                        for await (const str of result.textStream) {
                            if (i === 0) {
                                resolve(response);
                                const id = v4();
                                dataStream.write(`f:${JSON.stringify({
                                    messageId: id
                                })}\n`);
                            }
                            str.split("\n").forEach(line => dataStream.write(`0:${JSON.stringify(line)}\n`))
                            i++;
                        }
                        const json = {
                            finishReason: "stop",
                            usage: await result.usage,
                            isContinued: false,
                        }
                        dataStream.write(`e:${JSON.stringify(json)}\n`);
                        delete json.isContinued;
                        dataStream.write(`d:${JSON.stringify(json)}\n`);
                    } catch (e) {
                        console.error(e)
                        resolve(null)
                    }
                }
            })
        });
        if(result) return result;
    }
}