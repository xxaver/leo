import {z} from "zod";
import {createLiterals} from "@/data/types/createLiterals";
import {all} from "@/data/all";

export const getSchema = () => z.object({
    parts: z.array(
        z.object({
            text: z.string().optional().describe("The normal response text. You are encouraged to use markdown as usual."),
            showDocuments: z.array(z.object({
                description: z.string().describe("The description of the document to show."),
                url: z.string().describe("The url of the document to show."),
            })).optional().describe("Shows documents or web pages with the given urls. You must also use this - whenever applicable - to provide sources for what you just said, except if you already showed them using showDetails."),
            showImages: z.array(z.object({
                description: z.string().optional().describe("The description of the image to show."),
                url: z.string().describe("The url of the image to show."),
            })).optional().describe("The URLs and descriptions of the images to show."),
            showDetails: z.object({
                id: createLiterals(all),
                size: createLiterals(["small", "medium", "large"])
                    .describe("The size of the card. It should be 'small' expect if the user extremely specifically asked for this specific object"),
            }).describe("Shows information about the given ID or shows the form if the id belongs to a form. " +
                "If the user doesn't specifically ask for a specific date of an event, use the id of the event in general instead of multiple ids of specific dates. " +
                "Bear in mind that a detail card takes up a significant amount of space, so don't use to many of them in a single response!").array().optional(),
        })
    ).describe("The response parts to the user's question, including the normal text response."),
    promptSuggestions: z.array(
        z.object({
            short: z.string().optional().describe("The text that will be shown on the button for the user to press."),
            full: z.string().describe("The prompt that will be sent if the user chooses this suggestion."),
            editable: z.boolean().describe("Whether the user can edit the prompt before submitting it or weather the prompt from the suggestion should be sent instantly on clicking."),
        }).describe("A suggestion for questions the user might want to ask next. " +
            "The suggestion must be extremely closely related to the user's last question. " +
            "Make sure you only include questions that you are able to answer.")
    )
        // .optional()
        .describe("A list of suggestions for questions the user might want to ask next. " +
        "The suggestions must be extremely closely related to the user's last question. " +
        "Make sure you only include questions that you are able to answer. " +
        "You are also supposed to use this as a way to ask the user a question back (example: if they ask for the apology policy, ask if they are in class 5-10 or 11-12). " +
        "Also, whenever applicable, include a prompt suggestion that will lead the user to images related to your answer (if you didn't show images for that topic already)."),
})