import {EntityBase} from "@/data/types/entityBase";
import {Contact} from "@/data/types/contact";
import {EventDate} from "@/data/types/eventDate";

export interface EventInfo extends EntityBase {
    type: "event",
    description?: string,
    people?: Contact[]
}

export const renderEventInfo = (eventInfo: EventInfo) => {
    return []
}