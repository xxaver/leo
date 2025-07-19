import {EntityBase} from "@/data/types/entityBase";
import {Contact} from "@/data/types/contact";
import {EventDate} from "@/data/types/eventDate";

export interface RegularDate {
    place?: string,
    startDate?: string,
    endDate?: string,
}

export interface Ag extends EntityBase {
    type: "ag",
    description?: string,
    dates?: RegularDate[]
    targetGroup?: string,
}

export const renderRegularDate = (d: RegularDate) => {
    return [d.startDate, d.endDate, d.place].filter(Boolean).join(" ")
}
export const renderRegularDates = (d: RegularDate[]) => {
    return d.map(renderRegularDate).join(" / ")
}


export const renderAg = (ag: Ag) => {
    return [
        ag.description,
        ag.dates && `Termine: ${renderRegularDates(ag.dates)}`,
        ag.targetGroup && `Zielgruppe: ${ag.targetGroup}`,
    ]
}