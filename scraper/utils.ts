import {fileadmin} from "../config";

const forbidden = ["style", "script", "#comment", "noscript"];
const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
export const getInnerText = (e: Element) => {
    const result: (string | {image: string} | {document: string})[] = []
    const step = (e: Element) => {
        if (e.style?.display === "none" || forbidden.includes(e.nodeName.toLowerCase()) || e.classList?.contains("slick-slide") || e.classList?.contains("slides")) return [];
        if (!e.childNodes.length) result.push(e.textContent!.includes("main text") ? "" : e.textContent!);
        e.childNodes.forEach(step);
        if(e.nodeName === "IMG") result.push({image: e.src!})
        if(e.nodeName === "A" && !imageExtensions.some(ext => e.href.toLowerCase().endsWith("." + ext))) result.push(...(e.href.includes(fileadmin) ? [{document: e.href!}] : []))
    }
    step(e);
    const lastResult = [];
    for (const r of result) {
        if (typeof r === "string" && typeof lastResult.at(-1) === "string") lastResult[lastResult.length - 1] = (lastResult[lastResult.length - 1] + " " + r)
            .trim()
            .replace(/ /g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\s+([.,!?;:])/g, '$1')
        else lastResult.push(r);
    }
    return lastResult;
    // return step(e).map(e => typeof e === "string" ? e.trim() : e).join(" ")
    //     .replace(/\s+/g, " ")
        // .replace(/\s+([.,!?;:])/g, '$1')
        // .trim();
}

export const getUrl = (href: string, base: string) => {
    try {
        const url = new URL(href);
        url.hash = "";
        return url.href;
    } catch {
        try {
            const url = new URL(href, base);
            url.hash = "";
            return url.href;
        } catch {
            return "";
        }
    }
}