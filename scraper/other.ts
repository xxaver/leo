import {readFile, writeFile} from "node:fs/promises";
import {JSDOM} from "jsdom";
import {getInnerText, getUrl} from "./utils";

const start = ["https://www.gymnasium-weingarten.de/"];
const origins = ["https://www.gymnasium-weingarten.de"];
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
    const previous: Record<string, string> = JSON.parse(await readFile(target, "utf-8").catch(() => "{}") || "{}")
    const next: Record<string, string> = {};
    const visited = new Set<string>(Object.keys(previous));

    const scrapeSite = async (url: string) => {
        const u = new URL(url);
        const id = u.href;
        if (visited.has(id) || !includeSite(url)) return;
        console.log("Scraping", url)
        visited.add(id);
        await new Promise(r => setTimeout(r, delay));

        try {

            const req = await fetch(url);
            const text = await req.text();
            const dom = new JSDOM(text);
            const document = dom.window.document;

            if (includeContent(url)) {
                const main = document.querySelector("main")!;
                next[id] = main ? getInnerText(main) : null;
            }

            const links = Array.from<HTMLAnchorElement>(
                document.querySelectorAll("a"))
                .map((e) => getUrl(e.href, url))

            for(const link of links) await scrapeSite(link);
            // await Promise.all(links.map(scrapeSite))
        }
        catch (e) {
            console.error(e)
        }
    }
    await Promise.all(start.map(scrapeSite))
    const result = {...next, ...previous};
    console.log(result)
    await writeFile(target, JSON.stringify(result, null, 2), "utf-8")
};