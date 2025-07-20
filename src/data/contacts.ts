import {Contact} from "@/data/types/contact";
import {kontakt} from "@/data/forms";

export const sekretariat: Contact = {
    type: "contact",
    id: "Sekretariat",
    name: "Sekretariat",
    place: "Brechenmacherstraße 19, 88250 Weingarten, 1. Obergeschoss",
    phone: "+49 751 561921-50",
    fax: "+49 751 561921-60",
    email: "poststelle@gym-weingarten.schule.bwl.de",
    related: [kontakt]
};
export const rothmaier =  {
    id: "rothmaier",
    type: "contact",
    name: "Herr Rothmaier",
    description: "Leiter der Robotics-AG"
}
export const contacts = [sekretariat];