import {news} from "@/data/news";
import {ags} from "@/data/ags";
import {contacts, sekretariat} from "@/data/contacts";
import {events} from "@/data/events";
import {Entity} from "@/data/types/entityBase";
import {forms, kontakt} from "@/data/forms";
kontakt.related?.push(sekretariat)
export const all: Entity[] = [...news, ...events, ...ags, ...contacts, ...forms, ...events.flatMap(e => e.related?.filter(r => r.type === "eventDate") || [])]