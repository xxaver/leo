import {z} from "zod";
import {createLiterals} from "@/data/types/createLiterals";
import {events} from "@/data/events";

export const getSchema = () => z.object({
    parts: z.array(
        z.object({
            text: z.string().optional().describe("The normal response text. You may use markdown as usual."),
            showDetails: createLiterals(events).optional().describe("Shows information about the given ID."),
        })
    ).describe("The response parts to the user's question, including the normal text response."),
    promptSuggestions: z.array(
        z.object({
            short: z.string().optional().describe("The text that will be shown on the button for the user to press."),
            full: z.string().describe("The prompt that will be sent if the user chooses this suggestion."),
            editable: z.boolean().describe("Whether the user can edit the prompt before submitting it or weather the prompt from the suggestion should be sent instantly on clicking."),
        }).describe("A suggestion for questions the user might want to ask next. The suggestion must be extremely closely related to the user's last question.")
    ).optional().describe("A list of suggestions for questions the user might want to ask next. The suggestions must be extremely closely related to the user's last question."),
})