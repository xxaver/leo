import other from "@/data/other.json";
import {getUrl} from "../../../scraper/utils";
import {schoolUrl} from "../../../config";

export const formatOther = (k: any) => {
    let imagesDone = 0;
    
    return`${k}: ${other[k].content.map(e => {
        if(typeof e === "string") return e
        // return;
        if(e.image && imagesDone < 5) {
            imagesDone++;
            return `BILD: ${getUrl(e.image, schoolUrl)}`
        }
        if(e.document) return `DOKUMENT: ${getUrl(e.document, schoolUrl)}`
    }).filter(Boolean).join("\n")}`
}