import {google} from "@ai-sdk/google";
import {generateObject} from "ai";
import {z} from "zod";
import {German} from "@/app/languages/german";
import {readFile, writeFile} from "node:fs/promises";
import {languages as languages1} from "@/app/languages/languages";
import {merge} from "@/utils";

const languages = languages1.filter(e => e.englishName !== "German").map(e => e.englishName.toLowerCase());

const translate = async (languages: string[], toTranslate: typeof German) => {
    console.log("Translating", languages.join(", "))

    const model = google("gemini-2.5-pro");
    const result = await generateObject({
        model,
        schema: z.object({
            translations: z.object(Object.fromEntries(languages.map(l => [l, z.string().describe(`${l} translation`)])))
        }),
        system: "Translate all values of the json object given by the user to every of the given languages. Return the JSON objects with the same structure as the one entered by the user, but with the values translated to the specific language.",
        messages: [{
            role: "user",
            content: JSON.stringify(toTranslate)
        }]
    });

    console.log(result)
    await writeFile("translate-result.json", JSON.stringify(result.object, null, 4), "utf-8")
    languages.forEach(async l => {
        const upper = l[0].toUpperCase() + l.slice(1)
        let last = {};
        try {
            last = (await import("./src/app/languages/" + l + ".ts"))[upper];
        } catch {
        }

        try {
            const merged = JSON.stringify(merge(JSON.parse(result.object.translations[l]), last), null, 4);
            writeFile("src/app/languages/" + l + ".ts", `
import {German} from "@/app/languages/german";

export const ${upper}: typeof German = ${merged};
`, "utf-8");
        } catch {
            console.log("ERROR");
        }
    })

}


const main = async () => {
    const cached = JSON.parse(await readFile("translate-cache.json", "utf-8").catch(() => "{}"));
    const step = (cache: any, current: any) => {
        const result: any = {};
        for (const key in current) {
            if (typeof current[key] === "object") {
                const res = step(cache[key] || {}, current[key]);
                if (res) result[key] = res;
            } else if (cache[key] !== current[key]) result[key] = current[key];
        }
        return Object.keys(result).length ? result : null;
    }

    const groups = 5;
    const grouped = new Array(groups).fill(0).map((_) => []);
    const newOnes: string[] = [];
    let i = 0;
    await Promise.all(languages.map(async (l) => {
        if (await import("./src/app/languages/" + l + ".ts")) {
            grouped[i % groups].push(l);
            i++;
        } else newOnes.push(l);
    }));
    const toTranslate = step(cached, German);
    console.log(toTranslate, newOnes)
    if (toTranslate) for (const group of grouped) {
        if (group.length) await translate(group, toTranslate);
    }
    if (newOnes.length) await translate(newOnes, German);
    await writeFile("translate-cache.json", JSON.stringify(German, null, 2), "utf-8")
}
main()