import {EntityBase} from "@/data/types/entityBase";

export interface EventDate extends EntityBase {
    type: "eventDate",
    startDate?: number,
    endDate?: number,
    place?: string,
}

export const renderEventDate = (eventDate: EventDate) => {
    return [
        eventDate.place && `Ort: ${eventDate.place}`,
        eventDate.startDate && `Beginn: ${new Date(eventDate.startDate).toLocaleString("de-DE")}`,
        eventDate.endDate && `Ende: ${new Date(eventDate.endDate).toLocaleString("de-DE")}`,
    ].filter(Boolean).join("; ") + ` (ID: ${eventDate.id})`
}