import {z} from "zod";
import {createLiterals} from "@/data/types/createLiterals";
import {contacts} from "@/data/contacts";
import {news} from "@/data/news";
import {events} from "@/data/events";

export const getSchema = () => z.object({
    parts: z.array(
        z.object({
            text: z.string().optional().describe("The normal response text. You may use markdown as usual."),
            contactCard: createLiterals(contacts).optional().describe("Shows contact information for this specific entity to the user."),
            newsArticle: createLiterals(news).optional().describe("Shows a link to this specific news article to the user."),
            eventCard: createLiterals(events).optional().describe("Shows information for this specific event to the user."),
        })
    ).describe("The response parts to the user's question, including the normal text response."),
    promptSuggestions: z.array(
        z.object({
            short: z.string().optional().describe("The text that will be shown on the button for the user to press."),
            full: z.string().describe("The prompt that will be sent if the user chooses this suggestion."),
        })
    ).optional().describe("A list of suggestions for questions the user might want to ask next."),
})