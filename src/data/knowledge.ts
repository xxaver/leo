import {general} from "@/data/general";
import {renderEntities} from "@/data/types/entityBase";
import {ags} from "@/data/ags";
import {news} from "@/data/news";
import {forms} from "@/data/forms";
import {contacts} from "@/data/contacts";
import {events} from "@/data/events";
import other from "@/data/other.json";
import entschuldigung from "@/data/entschuldigungspraxis_neu.txt";
import {compressUrls} from "@/data/formatUrls";
import {formatOther} from "@/data/types/other";

const articles = Object.keys(other)
    .filter(k => other[k] && !k.includes("/aktuelles/") && !other[k].title?.includes("Impressionen aus dem Kunstunterricht"))

export const knowledge = `Wichtige Links:
Website: https://www.gymnasium-weingarten.de/
WebUntis (Stundenplan, Vertretungsplan): https://perseus.webuntis.com/WebUntis/?school=gym-weingarten#/basic/login
Moodle: https://bw.schule/login
NextCloud (gleiche Zugangsdaten wie bei den Computern intern): https://cloud.gymnasium-weingarten.de/nextcloud/login
`;


export const fullKnowledge = compressUrls(`Wichtige Links:
Website: https://www.gymnasium-weingarten.de/
WebUntis (Stundenplan, Vertretungsplan): https://perseus.webuntis.com/WebUntis/?school=gym-weingarten#/basic/login
Moodle: https://bw.schule/login
NextCloud (gleiche Zugangsdaten wie bei den Computern intern): https://cloud.gymnasium-weingarten.de/nextcloud/login

Allgemeines zur Schule:
${general}

Kontaktpersonen:
${renderEntities(contacts)}

Arbeitsgemeinschaften:
${renderEntities(ags)}

Veranstaltungen und aktuelle Termine:
${renderEntities(events)}

Neuigkeiten:
${renderEntities(news)}

Entschuldigungsregelung:
${entschuldigung}

Formulare:
${renderEntities(forms)}

Zusammenfassung der Website inklusive Links:
${
    articles
        .map(formatOther).join("\n")
}
`)
console.log(fullKnowledge, articles)