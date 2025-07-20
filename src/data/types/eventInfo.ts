import {EntityBase} from "@/data/types/entityBase";
import {Contact} from "@/data/types/contact";

export interface EventInfo extends EntityBase {
    type: "event",
    description?: string,
    people?: Contact[]
}

export const renderEventInfo = (eventInfo: EventInfo) => {
    return [eventInfo.description]
}