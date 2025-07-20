import {news} from "@/data/news";
import {ags} from "@/data/ags";
import {contacts} from "@/data/contacts";
import {events} from "@/data/events";
import {Entity} from "@/data/types/entityBase";

export const all: Entity[] = [...news, ...events, ...ags, ...contacts, ...events.flatMap(e => e.related?.filter(r => r.type === "eventDate") || [])]