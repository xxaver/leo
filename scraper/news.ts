import {JSDOM} from "jsdom"
import {readFile, writeFile} from "node:fs/promises";
import {News} from "@/data/types/news";
import {getInnerText} from "./utils";

export const scrapeNews = async (target: string) => {
    target += "/news.json"
    const previous: Record<string, News> = JSON.parse(await readFile(target, "utf-8").catch(() => "{}") || "{}")
    const next: Record<string, News> = {};

    const request = await fetch("https://www.gymnasium-weingarten.de/")
    const text = await request.text()
    const jsdom = new JSDOM(text);
    const document = jsdom.window.document;
    const links = Array.from<HTMLAnchorElement>(
        document.querySelectorAll("main a"))
        .map(e => e.href)
        .filter(e => e.startsWith("/aktuelles/"))

    for (const link of links) {


        // await Promise.all(links.map(async link => {
        const url = new URL(link, "https://www.gymnasium-weingarten.de");
        const params = new URLSearchParams(url.search);
        const id = "news_" + params.get("tx_news_pi1[news]")

        if (previous[id] !== undefined || next[id] !== undefined) continue;
        console.log("Scraping news", url.href);

        const r = await fetch(url);
        const text = await r.text();
        const document = new JSDOM(text).window.document;
        const name = getInnerText(document.querySelector("main h1")!);
        const description = getInnerText(document.querySelector("main .article .row")!);
        const date = document.querySelector("main time")!.getAttribute("datetime")!;
        const image = document.querySelector("main img")!.src;

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
    await writeFile(target, JSON.stringify(result, null, 2), "utf-8")
}