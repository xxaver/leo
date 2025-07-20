import {google} from '@ai-sdk/google';
import {createDataStreamResponse, streamObject} from 'ai';
import {generateSystemPrompt, languageHeader} from "@/data/systemPrompt";
import {getSchema} from "@/data/schema";
import {v4} from "uuid";

export const maxDuration = 30;

export async function POST(req: Request) {
    const {messages} = await req.json();

    return createDataStreamResponse({
        execute: async dataStream => {
            try {
                const result = streamObject({
                    model: google('gemini-2.5-flash'),
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
            }
        }
    })


}