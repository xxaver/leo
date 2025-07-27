import {google} from "@ai-sdk/google";
import {generateObject} from "ai";
import {z} from "zod";
import {German} from "@/app/languages/german";
import {readFile, writeFile} from "node:fs/promises";
import {merge} from "@/utils";
import {languages as languages1} from "@/app/languages/languages";

const languages = languages1.filter(e => e.englishName !== "German").map(e => e.englishName.toLowerCase());

const getSchema = (obj: any) => {
    if(typeof obj === "string") return z.string();
    if(typeof obj === "number") return z.number();
    if(typeof obj === "boolean") return z.boolean();
    if(Array.isArray(obj)) return z.array(getSchema(obj[0]));
    if(typeof obj === "object") return z.object(Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, getSchema(v)])))
    return z.unknown();
}
const translate = async (languages: string[], toTranslate: typeof German) => {
    console.log("Translating", languages.join(", "))

    const model = google("gemini-2.5-flash");
    const result = await generateObject({
        model,
        schema: z.object({
            translations: z.object(Object.fromEntries(languages.map(l => [l, getSchema(toTranslate).describe(`${l} translation`)])))
        }),
        system: "Translate all values of the json object given by the user to every of the given languages. " +
            "Return the JSON objects with the same structure as the one entered by the user, but with the values translated to the specific language. " +
            "The strings wrapped in {} are placeholders and must not be translated. " +
            "It is extremely important that you return a json object that matches the structure of the input object. ",
        messages: [{
            role: "user",
            content: JSON.stringify(toTranslate)
        }]
    });

    console.log(result)
    await writeFile("translate-result.json", JSON.stringify(result.object, null, 4), "utf-8")
    const r = await Promise.all(languages.map(async l => {
        const upper = l[0].toUpperCase() + l.slice(1)
        let last = {};
        try {
            last = (await import("./src/app/languages/" + l + ".ts"))[upper];
        } catch {
        }

        try {
            const merged = JSON.stringify(merge(result.object.translations[l], last), null, 4);
            writeFile("src/app/languages/" + l + ".ts", `
import {German} from "@/app/languages/german";

export const ${upper}: typeof German = ${merged};
`, "utf-8");
            return true;
        } catch {
            console.log("ERROR", l, result.object.translations[l]);
        }
    }))
    return !r.some(e => !e);
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

    const groups = 10;
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
        if(!group.length) continue;
        let isOk = false;
        while (!isOk) {
            isOk = await translate(group, toTranslate);
        }
    }
    if (newOnes.length) await translate(newOnes, German);
    await writeFile("translate-cache.json", JSON.stringify(German, null, 2), "utf-8")
}
main()