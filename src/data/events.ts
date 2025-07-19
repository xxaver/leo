import {EventInfo} from "@/data/types/eventInfo";

export const theater: EventInfo = {
    type: "event",
    id: "theater2025",
    name: "Theater: Der kleine Prinz",
    related: [{
        type: "eventDate",
        id: "theater2025-1",
        place: "Turnhalle 4",
        startDate: 1752861600000,
        endDate: 1752868800000
    }, {
        type: "eventDate",
        id: "theater2025-2",
        place: "Turnhalle 4",
        startDate: 1752948000000,
        endDate: 1752955200000
    }, {
        type: "eventDate",
        id: "theater2025-3",
        place: "Turnhalle 4",
        startDate: 1753023600000,
        endDate: 1753030800000
    }],
}
export const events = [theater];