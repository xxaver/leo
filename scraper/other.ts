import {readFile, writeFile} from "node:fs/promises";
import {JSDOM} from "jsdom";
import {getInnerText, getUrl} from "./utils";
import {scrapeIncludeContent, scrapeIncludeSite, scrapeOrigins, scrapeStart} from "../config";

const delay = 100;

export const scrapeOther = async (target: string, useCache = false) => {
    const cache = JSON.parse(await readFile("./scrape-cache.json", "utf-8").catch(() => "{}") || "{}");
    const other = `${target}/other.json`;
    // const images = `${target}\\images.json`;
    // const documents = `${target}\\documents.json`;

    // const previousImages: Record<string, string> = JSON.parse(await readFile(images, "utf-8").catch(() => "{}") || "{}")
    // const nextImages: Record<string, string> = {};

    // const previousDocuments: Record<string, string> = JSON.parse(await readFile(documents, "utf-8").catch(() => "{}") || "{}")
    // const nextDocuments: Record<string, string> = {};

    const previous: Record<string, string> = JSON.parse(await readFile(other, "utf-8").catch(() => "{}") || "{}")
    const next: Record<string, string> = {};
    const visited = new Set<string>(useCache ? Object.keys(previous) : [])
    let count = 0;

    const scrapeSite = async (url: string) => {
        try {
            url = getUrl(url, scrapeOrigins[0])
            const u = new URL(url);

            const id = u.href;
            if (visited.has(id) || !scrapeIncludeSite(url)) return;
            console.log("Scraping", url)
            visited.add(id);

            let text;
            if (cache[url] && useCache) text = cache[url];
            else {
                await new Promise(r => setTimeout(r, delay));
                const req = await fetch(url);
                text = await req.text();
                cache[url] = text;
            }
            const dom = new JSDOM(text);
            const document = dom.window.document;

            const links = Array.from<HTMLAnchorElement>(
                document.querySelectorAll("a"))
            if (scrapeIncludeContent(url)) {
                const main = document.querySelector("main")!;
                const date = document.querySelector("main time")?.getAttribute("datetime");
                if (!main || (date && new Date(date).getTime() < 1735686000000)) next[id] = null;
                else {
                    count++;
                    next[id] = {
                        title: (main.querySelector("h1") || main.querySelector("h2") || main.querySelector("h3") || main.querySelector("h4"))?.textContent,
                        content: getInnerText(main).filter(Boolean),
                        // images: Array.from(document.querySelectorAll<HTMLImageElement>("main img:not(:is(.slick-slide img))")).map((e) => {
                        //     const src = getUrl(e.src, scrapeOrigins[0]);
                        //     return {
                        //         src,
                        //         description: e.alt,
                        //     }
                        // }),
                        // documents: Array.from(document.querySelectorAll<HTMLAnchorElement>("main a"))
                        //     .filter(e => e.href.includes("/fileadmin/"))
                        //     .map((e) => {
                        //         const href = getUrl(e.href, scrapeOrigins[0]);
                        //         if (!e.href.includes("/fileadmin/")) return;
                                // return {
                                //     src: href,
                                //     description: e.textContent,
                                // }
                            // })
                    };
                }
            } else next[id] = null;


            for (const link of links) await scrapeSite(link.href);
            // await Promise.all(links.map(scrapeSite))
        } catch (e) {
            console.error(e)
        }
    }
    await Promise.all(scrapeStart.map(scrapeSite))
    console.log("ANZAHL SEITEN:", count)
    const result = {...previous, ...next};
    console.log(result)
    // const resultImages = {...nextImages, ...previousImages};
    // const resultDocuments = {...nextDocuments, ...previousDocuments};
    // console.log(result)
    await writeFile(other, JSON.stringify(result, null, 2), "utf-8")
    await writeFile("./scrape-cache.json", JSON.stringify(cache, null, 2), "utf-8")
    // await writeFile(documents, JSON.stringify(resultDocuments, null, 2), "utf-8")
    // await writeFile(images, JSON.stringify(resultImages, null, 2), "utf-8")
};