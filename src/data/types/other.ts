import other from "@/data/other.json";

export const formatOther = (k: any) => {
    return`${k}: ${other[k].content.join("\n")}
         Bilder auf der Seite: ${other[k].images?.map(img => img.description ? `${img.src} (${img.description})` : img.src).join("; ")}
         Dokumente auf der Seite: ${other[k].documents?.map(img => img.description ? `${img.src} (${img.description})` : img.src).join("; ")}`
}