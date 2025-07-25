import {general} from "@/data/general";
import {format} from "@/data/types/entityBase";
import {ags} from "@/data/ags";
import {news} from "@/data/news";
import {forms} from "@/data/forms";
import {contacts} from "@/data/contacts";
import {events} from "@/data/events";
import other from "@/data/other.json";
import entschuldigung from "@/data/entschuldigungspraxis_neu.txt";
import {compressUrls} from "@/data/formatUrls";
import {formatOther} from "@/data/types/other";
import {schoolUrl} from "../../config";

const articles = Object.keys(other)
    .filter(k => other[k] && !k.includes("/aktuelles/") && !other[k].title?.includes("Impressionen aus dem Kunstunterricht"))

export const knowledge = `Wichtige Links:
Website: ${schoolUrl}
WebUntis (Stundenplan, Vertretungsplan): https://perseus.webuntis.com/WebUntis/?school=gym-weingarten#/basic/login
Moodle: https://bw.schule/login
NextCloud (gleiche Zugangsdaten wie bei den Computern intern): https://cloud.gymnasium-weingarten.de/nextcloud/login
`;



compressUrls(`Wichtige Links:
Website: ${schoolUrl}
WebUntis (Stundenplan, Vertretungsplan): https://perseus.webuntis.com/WebUntis/?school=gym-weingarten#/basic/login
Moodle: https://bw.schule/login
NextCloud (gleiche Zugangsdaten wie bei den Computern intern): https://cloud.gymnasium-weingarten.de/nextcloud/login

Neuigkeiten:
${format(news)}

Entschuldigungsregelung:
${entschuldigung}

Formulare:
${format(forms)}

Zusammenfassung der Website inklusive Links:
${
    articles
        .map(formatOther).join("\n")
}
`)

export const fullKnowledge = compressUrls(`Wichtige Links:
Website: ${schoolUrl}
WebUntis (Stundenplan, Vertretungsplan): https://perseus.webuntis.com/WebUntis/?school=gym-weingarten#/basic/login
Moodle: https://bw.schule/login
NextCloud (gleiche Zugangsdaten wie bei den Computern intern): https://cloud.gymnasium-weingarten.de/nextcloud/login

Allgemeines zur Schule:
${general}

Kontaktpersonen:
${format(contacts)}

Arbeitsgemeinschaften:
${format(ags)}

Veranstaltungen und aktuelle Termine:
${format(events)}

Neuigkeiten:
${format(news)}

Entschuldigungsregelung:
${entschuldigung}

Formulare:
${format(forms)}

Zusammenfassung der Website inklusive Links:
${
    articles
        .map(formatOther).join("\n")
}
`)
// console.trace("HALLO")
// console.log(fullKnowledge, articles)