import {EntityBase} from "@/data/types/entityBase";

export interface EventDate extends EntityBase {
    type: "eventDate",
    startDate?: number,
    endDate?: number,
    place?: string,
    price?: number | string,
}

export const renderEventDate = (eventDate: EventDate) => {
    return [
        eventDate.place && `Ort: ${eventDate.place}`,
        eventDate.startDate && `Beginn: ${new Date(eventDate.startDate).toLocaleString("de-DE")}`,
        eventDate.endDate && `Ende: ${new Date(eventDate.endDate).toLocaleString("de-DE")}`,
        eventDate.price && `Eintritt: ${typeof eventDate.price === "number" ? eventDate.price + " €" : eventDate.price}`,
    ].filter(Boolean).join("; ") + ` (ID: ${eventDate.id})`
}