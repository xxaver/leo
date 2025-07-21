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

    const scrapeSite = async (url: string) => {
        try {
            url = getUrl(url, origins[0])
            const u = new URL(url);

            const id = u.href;
            if (visited.has(id) || !includeSite(url)) return;
            console.log("Scraping", url)
            visited.add(id);
            await new Promise(r => setTimeout(r, delay));

            const req = await fetch(url);
            const text = await req.text();
            const dom = new JSDOM(text);
            const document = dom.window.document;

            const links = Array.from<HTMLAnchorElement>(
                document.querySelectorAll("a"))

            if (includeContent(url)) {
                const main = document.querySelector("main")!;
                if (!main) next[id] = null;
                else {
                    next[id] = getInnerText(main);
                    let done = false;
                    document.querySelectorAll<HTMLImageElement>("main img").forEach((e) => {
                        const src = getUrl(e.src, url);
                        if (false) {
                        }// if (e.alt) nextImages[src] = nextImages[src] ? nextImages[src] + "; " + e.alt : e.alt;
                        else {
                            if (!done) next[id] += "| BILDER auf dieser Seite:";
                            done = true;
                            next[id] += " " + e.src;
                            if(e.alt) next[id] += "(" + e.alt + ")";
                            next[id] += ";";
                        }
                    })

                    done = false;
                    links.forEach(e => {
                        const href = getUrl(e.href, url);
                        if (!e.href.includes("/fileadmin/")) return;
                        if (false) {
                            // nextDocuments[href] = nextImages[href] ? nextImages[href] + "; " + e.textContent! : e.textContent!;
                        } else {
                            if (!done) next[id] += "| DOKUMENTE auf dieser Seite:";
                            done = true;
                            next[id] += " " + e.href;
                            if(e.textContent) next[id] += "(" + e.textContent + ")";
                            next[id] += ";";
                        }
                    })
                }
            }


            for (const link of links) await scrapeSite(link.href);
            // await Promise.all(links.map(scrapeSite))
        } catch (e) {
            console.error(e)
        }
    }
    await Promise.all(start.map(scrapeSite))
    const result = {...next, ...previous};
    // const resultImages = {...nextImages, ...previousImages};
    // const resultDocuments = {...nextDocuments, ...previousDocuments};
    console.log(result)
    await writeFile(other, JSON.stringify(result, null, 2), "utf-8")
    // await writeFile(documents, JSON.stringify(resultDocuments, null, 2), "utf-8")
    // await writeFile(images, JSON.stringify(resultImages, null, 2), "utf-8")
};