import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google('gemini-2.0-flash'),
        system: 'Du bist ein Chatbot des Gymnasium Weingartens. Antworte immer auf Deutsch.',
        messages,
    });

    return result.toDataStreamResponse({
        getErrorMessage: (error) => {
            console.log(error)
            return "An error occurred."
        }
    });
}