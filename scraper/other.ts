import {readFile, writeFile} from "node:fs/promises";
import {JSDOM} from "jsdom";
import {getInnerText, getUrl} from "./utils";
import {origins} from "./config";

const start = ["https://www.gymnasium-weingarten.de/"];
const delay = 100;

const includeSite = (url: string) => {
    const u = new URL(url);
    if (!origins.includes(u.origin)) return false;
    if (url.includes("/aktuelles/")) return false;
    if (url.includes("/fileadmin/")) return false;
    return true;
}
const includeContent = (url: string) => {
    const u = new URL(url);
    return u.pathname !== "/" && u.pathname !== "/aktuelles";
}
export const scrapeOther = async (target: string) => {
    const cache = JSON.parse(await readFile("./scrape-cache.json", "utf-8").catch(() => "{}") || "{}");
    const other = `${target}\\other.json`;
    // const images = `${target}\\images.json`;
    // const documents = `${target}\\documents.json`;

    // const previousImages: Record<string, string> = JSON.parse(await readFile(images, "utf-8").catch(() => "{}") || "{}")
    // const nextImages: Record<string, string> = {};

    // const previousDocuments: Record<string, string> = JSON.parse(await readFile(documents, "utf-8").catch(() => "{}") || "{}")
    // const nextDocuments: Record<string, string> = {};

    const previous: Record<string, string> = JSON.parse(await readFile(target, "utf-8").catch(() => "{}") || "{}")
    const next: Record<string, string> = {};
    const visited = new Set<string>(Object.keys(previous));
    let count = 0;

    const scrapeSite = async (url: string) => {
        try {
            url = getUrl(url, origins[0])
            const u = new URL(url);

            const id = u.href;
            if (visited.has(id) || !includeSite(url)) return;
            console.log("Scraping", url)
            visited.add(id);

            let text;
            if(cache[url]) text = cache[url];
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

            if (includeContent(url)) {
                count++;
                const main = document.querySelector("main")!;
                if (!main) next[id] = null;
                else {
                    next[id] = {
                        content: Array.from(main.querySelectorAll("p, h1, h2, h3, h4, h5, h6")).map(getInnerText).filter(Boolean),
                        images: Array.from(document.querySelectorAll<HTMLImageElement>("main img")).map((e) => {
                            const src = getUrl(e.src, origins[0]);
                            return {
                                src,
                                description: e.alt,
                            }
                        }),
                        documents: Array.from(document.querySelectorAll<HTMLAnchorElement>("main a"))
                            .filter(e => e.href.includes("/fileadmin/"))
                            .map((e) => {
                            const href = getUrl(e.href, origins[0]);
                            // if (!e.href.includes("/fileadmin/")) return;
                            return {
                                src: href,
                                description: e.textContent,
                            }
                        })
                    };
                }
            }


            for (const link of links) await scrapeSite(link.href);
            // await Promise.all(links.map(scrapeSite))
        } catch (e) {
            console.error(e)
        }
    }
    await Promise.all(start.map(scrapeSite))
    console.log("ANZAHL SEITEN:", count)
    const result = {...next, ...previous};
    // const resultImages = {...nextImages, ...previousImages};
    // const resultDocuments = {...nextDocuments, ...previousDocuments};
    console.log(result)
    await writeFile(other, JSON.stringify(result, null, 2), "utf-8")
    await writeFile("./scrape-cache.json", JSON.stringify(cache, null, 2), "utf-8")
    // await writeFile(documents, JSON.stringify(resultDocuments, null, 2), "utf-8")
    // await writeFile(images, JSON.stringify(resultImages, null, 2), "utf-8")
};