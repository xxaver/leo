const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
export const assistantName = location.origin.includes("vercel.app") ? capitalize(location.origin.split("-")[1].split(".")[0]) : "Johannes";
export const description = "Ich bin der Chat-Assistent des Studienkolleg St. Johann Blönried. Ich helfe dir gerne bei deinen Fragen rund um unsere Schule.";
export const schoolName = "Studienkolleg St. Johann Blönried";
export const schoolAbbreviation = 'Du darfst den Namen der Schule mit SJB abkürzen.'
export const schoolUrl = "https://studienkolleg-st-johann.de/";
export const emailScheme = "(<erster buchstabe vorname>.<nachname>)@sksjb.de"
export const sourceUrl = "https://github.com/xxaver/leo"
export const primaryColor = "#0095d0";
export const scrapeStart = ["https://studienkolleg-st-johann.de/"];
export const scrapeOrigins = ["https://studienkolleg-st-johann.de"];
export const scrapeIncludeSite = (url: string) => {
    const u = new URL(url);
    if (!scrapeOrigins.includes(u.origin)) return false;
    if (url.includes("/fileadmin/")) return false;
    if (url.includes("?tx_skfstemplate_calendar")) return false;
    if (u.pathname.includes("archiv")) return false;
    return true;
}
export const scrapeIncludeContent = (url: string) => {
    const u = new URL(url);
    return u.pathname !== "/" && !u.pathname.includes("archiv");
}
export const fileadmin = "/fileadmin/";