const forbidden = ["style", "script", "#comment", "noscript"];
export const getInnerText = (e: Element) => {
    const step = (e: Element): string[] => {
        if (e.style?.display === "none" || forbidden.includes(e.nodeName.toLowerCase())) return [];
        if (!e.childNodes.length) return [e.textContent!.includes("main text") ? "" : e.textContent!];
        return Array.from(e.childNodes).flatMap(step);
    }
    return step(e).map(e => e.trim()).join(" ")
        // .replace(/\s+/g, " ")
        .replace(/\s+([.,!?;:])/g, '$1')
        .trim();
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