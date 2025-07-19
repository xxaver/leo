import {Ag, renderAg} from "@/data/types/ag";
import {News, renderNews} from "@/data/types/news";
import {EventDate, renderEventDate} from "@/data/types/eventDate";
import {Contact, renderContact} from "@/data/types/contact";
import {EventInfo, renderEventInfo} from "@/data/types/eventInfo";

export interface EntityBase {
    type: string,
    id: string,
    name?: string,
    link?: string
    related?: Entity[]
}

export type Entity = EventInfo | EventDate | Ag | Contact | News;

const fns = {
    ag: renderAg,
    news: renderNews,
    event: renderEventInfo,
    eventDate: renderEventDate,
    contact: renderContact,
} as any;

export const renderEntity = (entity: Entity) => {
    const persons = entity.related?.filter(c => c.type === "contact")
    const events = entity.related?.filter(c => c.type === "event")
    const dates = entity.related?.filter(c => c.type === "eventDate")
    const news = entity.related?.filter(c => c.type === "news")
    return [
        entity.name + " (ID: " + entity.id + ")",
        entity.link && `Link: ${entity.link}`,
        ...(fns[entity.type] ? fns[entity.type](entity) : []),
        persons?.length && `dazugehörige Ansprechpartner: ${persons.map(p => p.id).join(", ")}`,
        events?.length && `dazugehörige Events: ${events.map(e => e.id).join(", ")}`,
        dates?.length && `Termine:\n${dates.map(renderEventDate).join("\n")}`,
        news?.length && `dazugehörige Artikel: ${news.map(e => e.id).join(", ")}`,
        
    ].filter(Boolean).join("\n")
}
export const renderEntities = (entities: Entity[]) => {
    return entities.map(renderEntity).join("\n\n")
}