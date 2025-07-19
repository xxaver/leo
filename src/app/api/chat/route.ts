import {google} from '@ai-sdk/google';
import {createDataStreamResponse, streamObject, streamText} from 'ai';
import {systemPrompt} from "@/data/systemPrompt";
import {z} from "zod";
import {getSchema} from "@/data/schema";
import {v4} from "uuid";

const tools = {
    displayDetailsForID: {
        type: "function",
        parameters: z.object({
            id: z.string().describe("The ID of the object to display"),
        }),
        description: "Displays details for the object with the given ID",
    },
    displayNextPromptSuggestions: {
        type: "function",
        description: "Displays suggestions for what the user might want to ask next",
        parameters: z.object({
            suggestions: z.array(z.object({
                short: z.string().describe("The text that will be shown on the button for the user to press."),
                full: z.string().describe("The prompt that will be sent if the user chooses this suggestion."),
            })).describe("The suggestions to display")
        }),
    }
}

export const maxDuration = 30;

export async function POST(req: Request) {
    const {messages} = await req.json();
    // console.log(systemPrompt)

    //return streamText({
    //    model: google('gemini-2.5-flash'),
    //    system: systemPrompt,
    //    messages,
    //}).toDataStreamResponse({
    //    getErrorMessage: (error) => {
    //        console.log(error)
    //        return "An error occurred."
    //    }
    //});

    return createDataStreamResponse({
        execute: async dataStream => {
            try {
                const result = streamObject({
                    model: google('gemini-2.5-flash'),
                    system: systemPrompt,
                    schema: getSchema(),
                    messages,
                });
                console.log("RESULT", result)

                // dataStream.write(`f:{${JSON.stringify({
                //     messageId: (await result.response).id
                // })}}\n`);
                let i = 0;
                for await (const str of result.textStream) {
                    console.log(str)
                    if(i === 0) {
                        const id = v4(); 
                        // const id = (await result.response).id;
                        console.log(id)
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
            }
            catch (e) {
                console.error(e)
            }
        }
    })


}