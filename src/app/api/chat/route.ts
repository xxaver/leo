import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import {systemPrompt} from "@/data/systemPrompt";

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    console.log(systemPrompt)

    const result = streamText({
        model: google('gemini-2.0-flash'),
        system: systemPrompt,
        messages,
    });

    return result.toDataStreamResponse({
        getErrorMessage: (error) => {
            console.log(error)
            return "An error occurred."
        }
    });
}