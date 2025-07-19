import {EntityBase} from "@/data/types/entityBase";
import {RegularDate, renderRegularDates} from "@/data/types/ag";

export interface Contact extends EntityBase {
    type: "contact",
    description?: string,
    email?: string,
    phone?: string,
    fax?: string,
    place?: string,
    dates?: RegularDate[]
}

export const renderContact = (contact: Contact) => {
    return [
        contact.description,
        contact.email && `E-Mail: ${contact.email}`,
        contact.phone && `Telefon: ${contact.phone}`,
        contact.fax && `Fax: ${contact.fax}`,
        contact.place && `Ort: ${contact.place}`,
        contact.dates && `Sprechzeiten: ${renderRegularDates(contact.dates)}`
    ]
}