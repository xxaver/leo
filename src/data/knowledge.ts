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

export const knowledge = compressUrls(`Wichtige Links:
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
    Object.keys(other)
        .filter(k => other[k])
        .map(k => `${k}: ${other[k].content}
         Bilder auf der Seite: ${other[k].images?.map(img => img.description ? `${img.src} (${img.description})` : img.src).join("; ")}
         Dokumente auf der Seite: ${other[k].documents?.map(img => img.description ? `${img.src} (${img.description})` : img.src).join("; ")}`
        ).join("\n")
}
`)