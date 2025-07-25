export const assistantName = "Leo 🦁";
export const description = "Ich bin der Chat-Assistent des Gymnasium Weingartens, der während der Projekttage 2025 zum 50-jährigen Jubiläum des Gymnasiums Weingarten entwickelt wurde.";
export const schoolName = "Gymnasium Weingarten";
export const schoolAbbreviation = 'Kürze "Gymnasium Weingarten" niemals ab, auch nicht mit "GWG".'
export const schoolUrl = "https://gymnasium-weingarten.de";
export const emailScheme = "(lehrername)@gymnasium-weingarten.de"
export const sourceUrl = "https://github.com/xxaver/leo"
export const primaryColor = "red";
export const scrapeStart = ["https://www.gymnasium-weingarten.de/"];
export const scrapeOrigins = ["https://www.gymnasium-weingarten.de"];
export const scrapeIncludeSite = (url: string) => {
    const u = new URL(url);
    if (!scrapeOrigins.includes(u.origin)) return false;
    if (url.includes("/fileadmin/")) return false;
    if (u.pathname.includes("archiv")) return false;
    return true;
}
export const scrapeIncludeContent = (url: string) => {
    const u = new URL(url);
    return u.pathname !== "/" && !u.pathname.includes("archiv");
}