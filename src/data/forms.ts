import {Form} from "@/data/types/form";
import {KontaktForm} from "@/data/forms/kontakt";

export const kontakt: Form = {
    type: "form",
    id: "kontakt",
    name: "Kontaktformular",
    element: KontaktForm,
    related: []
}
export const forms = [kontakt];