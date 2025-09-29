export const assistantName = "Albert";
export const assistantNameValid = (n: string) =>  ["Albert"].includes(n)
export const description = "Ich bin der Chat-Assistent des Albert-Einstein-Gymnasium Ravensburg. Ich helfe dir gerne bei deinen Fragen rund um unsere Schule.";
export const schoolName = "Albert-Einstein-Gymnasium Ravensburg";
export const schoolAbbreviation = 'Du darfst den Namen der Schule mit AEG abkürzen.'
export const schoolUrl = "https://aegrv.de/";
export const emailScheme = `` // TODO: EMAIL
export const sourceUrl = "https://github.com/xxaver/leo/tree/aeg"
export const primaryColor = "#0095d0";
export const scrapeStart = ["https://aegrv.de/"];
export const scrapeOrigins = ["https://aegrv.de"];
export const scrapeIncludeSite = (url: string) => {
    const u = new URL(url);
    if (!scrapeOrigins.includes(u.origin)) return false;
    const first = u.pathname.split("/")[1];
    if(!isNaN(parseInt(first)) && Number(first) < 2025) return false;
    if(url.includes("/aktuelles/page/4")) return false
    if (url.includes("/fileadmin/") || url.includes("wp-content")) return false;
    if (url.includes("?tx_skfstemplate_calendar")) return false;
    if (u.pathname.includes("archiv")) return false;
    return true;
}
export const scrapeIncludeContent = (url: string) => {
    const u = new URL(url);
    return u.pathname !== "/" && !u.pathname.includes("archiv") && !u.pathname.includes("/page/");
}
export const fileadmin = "/fileadmin/";