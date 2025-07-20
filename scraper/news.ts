import {JSDOM} from "jsdom"
import {readFile, writeFile} from "node:fs/promises";
import {News} from "@/data/types/news";

const target = "C:\\Users\\Daniel\\WebstormProjects\\gym-wgt-ai\\src\\data\\news.json";
const getInnerText = (e: Element) => {
    const step = (e: Element): string[] => {
        if (e.style.display === "none") return [];
        const result: string[] = [];
        for (const child of e.childNodes) {
            if (!child.childNodes.length) result.push(child.textContent!.includes("main text") ? "" : child.textContent!);
            else result.push(...step(child));
        }
        return result;
    }
    return step(e).map(e => e.trim()).join(" ")
        .replace(/\s+/g, " ")
        .replace(/\s+([.,!?;:])/g, '$1')
        .trim();
}

const main = async () => {
    const previous: Record<string, News> = JSON.parse(await readFile(target, "utf-8").catch(() => "{}") || "{}")
    const next: Record<string, News> = {};

    const request = await fetch("https://www.gymnasium-weingarten.de/")
    const text = await request.text()
    const jsdom = new JSDOM(text);
    const doc = jsdom.window.document;
    const links = Array.from<HTMLAnchorElement>(
        doc.querySelectorAll("main a"))
        // .filter(e => e.checkVisibility())
        .map(e => e.href)
        .filter(e => e.startsWith("/aktuelles/"))

    console.log(links)
    for (const link of links) {


        // await Promise.all(links.map(async link => {
        const url = new URL(link, "https://www.gymnasium-weingarten.de");
        const params = new URLSearchParams(url.search);
        const id = "news_" + params.get("tx_news_pi1[news]")

        if (previous[id] !== undefined) return;

        const r = await fetch(url);
        const text = await r.text();
        const doc = new JSDOM(text).window.document;
        const name = getInnerText(doc.querySelector("main h1")!);
        const description = getInnerText(doc.querySelector("main .article .row")!);
        const date = doc.querySelector("main time")!.getAttribute("datetime")!;
        const image = doc.querySelector("main img")!.src;

        next[id] = {
            type: "news",
            id,
            name,
            description,
            date: new Date(date).getTime(),
            image: new URL(image, url).href,
            link: url.href
        }
        // }))
    }
    const result = {...next, ...previous};
    console.log(result)
    await writeFile(target, JSON.stringify(result, null, 2), "utf-8")
}
main();