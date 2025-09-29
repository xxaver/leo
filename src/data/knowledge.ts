import schulfest from "@/data/schulfest.txt";
import other from "@/data/other.json";
import {compressUrls} from "@/data/formatUrls";
import {formatOther} from "@/data/types/other";
import {schoolUrl} from "../../config";

const articles = Object.keys(other)
    .filter(k => other[k] && !k.includes("/aktuelles/"))

export const knowledge = `Wichtige Links:
Website: ${schoolUrl}

Infos zum Schulfest:
${schulfest}
`;


compressUrls(`Wichtige Links:
Website: ${schoolUrl}
Infos zum Schulfest:
${schulfest}

Zusammenfassung der Website inklusive Links:
${
    articles
        .map(formatOther).join("\n")
}
`)

export const fullKnowledge = compressUrls(`Wichtige Links:
Website: ${schoolUrl}

Tel. 0751-82342
Fax. 0751-82116
Poststelle-gym@aeg-rv.schule.bwl.de

Albert Einstein Gymnasium
Spohnstraße 22
88212 Ravensburg


Zusammenfassung der Website inklusive Links:
${
    articles
        .map(formatOther).join("\n")
}
`)
// console.trace("HALLO")
console.log(fullKnowledge)