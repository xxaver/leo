import {google} from '@ai-sdk/google';
import {
    convertToCoreMessages,
    createDataStreamResponse,
    LanguageModelV1,
    streamObject,
    streamText,
    tool,
    ToolSet
} from 'ai';
import {generateSystemPrompt} from "@/data/systemPrompt";
import {v4} from "uuid";
import {writeFile} from "node:fs/promises";
import {fullKnowledge, knowledge} from "@/data/knowledge";
import {z} from "zod";
import {createLiterals} from "@/data/types/createLiterals";
import other from "@/data/other.json";
import {formatOther} from "@/data/types/other";
import {getSchema} from "@/data/schema";
import {groq} from "@ai-sdk/groq";
import {customHeader, languageHeader} from "@/data/languageHeader";
import {Octokit} from "octokit";

const mapName = ([k, e]: any) => e?.title || k.split("/").reverse().find(Boolean) || k;
const available = Object.entries(other).filter(e => e[1] && !e[0].includes("archiv")).map(mapName);

const customModels = {
    flash: google('gemini-2.5-flash', {
        object: true
    }),
    flashLite: google('gemini-2.5-flash-lite', {
        object: true
    }),
    pro: google('gemini-2.5-pro', {
        object: true
    }),

    flash2: google('gemini-2.0-flash', {
        object: true
    }),
    flashLite2: google('gemini-2.0-flash-lite', {
        object: true
    }),
    
    k2: groq("moonshotai/kimi-k2-instruct", {schema: true})
} as any;

const models = [
    // "github-workflow",
    google('gemini-2.5-flash', {
        object: true
    }),
    google('gemini-2.5-flash-lite', {
        object: true
    }),
    // google('gemini-2.0-flash', {
    //     schema: true
    // }),
    // google('gemini-2.0-flash'),
    // groq("llama-3.1-8b-instant"),
    // groq("llama-3.3-70b-versatile"),
    groq("moonshotai/kimi-k2-instruct", {schema: true}),
    groq("meta-llama/llama-4-maverick-17b-128e-instruct", {schema: false}),
    groq("deepseek-r1-distill-llama-70b", {schema: true}),
    groq("meta-llama/llama-4-scout-17b-16e-instruct", {schema: true}),
    // ollama("gemma3:12b"),
    // ollama("llama3.1:8b"),
    // google('gemini-2.5-pro'),
    // google('gemini-2.0-flash'),
    // google('gemini-2.0-flash-lite')
]
const tools: ToolSet = {
    getInformation: tool({
        description: `read the contents of articles from the official Gymnasium Weingarten website. use this to gather information when answering questions. use this whenever applicable.`,
        parameters: z.object({
            articles: z.array(createLiterals(available)).describe('the articles to read'),
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
    const customModelChoice = req.headers.get(customHeader);
    console.log(customModelChoice, customModels[customModelChoice!])

    if(customModels[customModelChoice!]) return await doRequest(customModels[customModelChoice!], messages, req);
    for (const model of models) {
        const request = await doRequest(model, messages, req);
        if(request) return request;
    }
}

export const doRequest = async (model: LanguageModelV1 | "github-workflow", messages: any[], req: any) => {
    if (model === "github-workflow") {
        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN,
        })

        const result = await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
            owner: 'xxaver',
            repo: 'leo',
            workflow_id: 'completion.yaml',
            ref: 'master',
            inputs: {
                messages: JSON.stringify(messages),
            },
        })
    }

    return new Promise(resolve => {
        const response = createDataStreamResponse({
            onError: error => {
                // console.error(error);
                resolve(null)
                return error.toString();
            },
            execute: async dataStream => {
                try {
                    const object = model.settings?.object //model.provider.startsWith("google");
                    // const result = streamObject({
                    const result = (object ? streamObject : streamText)({
                        maxSteps: 5,
                        model,
                        tools,
                        // onChunk: console.log,
                        onError: e => {
                            console.error(model, e)
                            resolve(null)
                        },
                        onFinish: () => {
                            console.log("FINISH", model)
                        },
                        system: generateSystemPrompt(req.headers.get(languageHeader) || "Deutsch", object, model.settings?.schema),
                        schema: getSchema(),
                        providerOptions: {
                            groq: {
                                // reasoningFormat: "hidden",
                            }
                        },
                        // messages: [
                        //     {
                        //         role: "user",
                        //         content: [
                        //             {
                        //                 type: "file",
                        //                 data: Buffer.from(fullKnowledge, "utf-8"),
                        //                 mimeType: "text/plain",
                        //             }
                        //         ]
                        //     },
                        //     ...convertToCoreMessages(messages)
                        // ],
                        messages
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
}
// writeFile("./systemPrompt.txt", knowledge)