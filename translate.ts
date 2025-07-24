import {google} from "@ai-sdk/google";
import {generateObject} from "ai";
import {z} from "zod";
import {German} from "@/app/languages/german";
import {writeFile} from "node:fs/promises";

const languages = [
    // "english", "french", "polish", "russian", "ukrainian", "turkish",
    "spanish", "hindi", "urdu"
]
const translate = async () => {
    const model = google("gemini-2.5-pro");
    const result = await generateObject({
        model,
        schema: z.object({
            translations: z.object(Object.fromEntries(languages.map(l => [l, z.string().describe(`${l} translation`)])))
        }),
        system: "Translate all values of the json object given by the user to every of the given languages. Return the JSON objects with the same structure, but with the values translated to the specific language.",
        messages: [{
            role: "user",
            content: JSON.stringify(German)
        }]
    });

    console.log(result)
    await writeFile("translate-result.json", JSON.stringify(result.object, null, 4), "utf-8")
    languages.forEach(l => {
        writeFile("src/app/languages/" + l + ".ts", `
import {German} from "@/app/languages/german";

export const ${l[0].toUpperCase() + l.slice(1)}: typeof German = ${result.object.translations[l]};
`, "utf-8");
    })
}

translate()