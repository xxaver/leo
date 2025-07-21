import {google} from '@ai-sdk/google';
import {convertToCoreMessages, createDataStreamResponse, streamObject, streamText, tool, ToolSet} from 'ai';
import {generateSystemPrompt, languageHeader} from "@/data/systemPrompt";
import {v4} from "uuid";
import {writeFile} from "node:fs/promises";
import {knowledge} from "@/data/knowledge";
import {z} from "zod";
import {createLiterals} from "@/data/types/createLiterals";
import other from "@/data/other.json";
import {formatOther} from "@/data/types/other";
import {getSchema} from "@/data/schema";
import {groq} from "@ai-sdk/groq";

const mapName = ([k, e]: any) => e?.title || k.split("/").reverse().find(Boolean) || k;

const models = [
    // groq("deepseek-r1-distill-llama-70b"),
    // ollama("gemma3:12b"),
    // ollama("llama3.1:8b"),
    google('gemini-2.0-flash'),
    // google('gemini-2.5-pro'),
    // google('gemini-2.5-flash-lite-preview-06-17'),
    // google('gemini-2.0-flash'),
    // google('gemini-2.0-flash-lite')
]
console.log(Object.entries(other).map(mapName))
const tools: ToolSet = {
    getInformation: tool({
        description: `read the contents of articles from the official Gymnasium Weingarten website. use this to gather information when answering questions.`,
        parameters: z.object({
            articles: z.array(createLiterals(Object.entries(other).map(mapName))).describe('the articles to read'),
        }),
        execute: async ({articles: urls}) => {
            console.log("URLS", urls)
            return urls.map(url => {
                const page = Object.entries(other).find(e => mapName(e) === url)
                return page && page[1] && formatOther(page[0]);
            }).filter(Boolean)
        },
    }),
}

export const maxDuration = 30;

export async function POST(req: Request) {
    const {messages} = await req.json();

    for (const model of models) {
        const result = new Promise(resolve => {
            const response = createDataStreamResponse({
                onError: error => {
                    console.error(error);
                    return error.toString();
                },
                execute: async dataStream => {
                    try {
                        const object = false //model.provider.startsWith("google");
                        // console.log(model)
                        const result = (object ? streamObject: streamText)({
                            maxSteps: 5,
                            model,
                            tools,
                            // onChunk: console.log,
                            onError: e => {
                                console.error(model, e)
                                resolve(null)
                            },
                            system: generateSystemPrompt(req.headers.get(languageHeader) || "Deutsch", object),
                            schema: getSchema(),
                            providerOptions: {
                                groq: {
                                    // reasoningFormat: "hidden",
                                }
                            },
                            messages: convertToCoreMessages(messages),
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
        if (result) return result;
    }
}

writeFile("./systemPrompt.txt", knowledge)