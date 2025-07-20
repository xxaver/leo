import {EntityBase} from "@/data/types/entityBase";
import {FC} from "react";

export interface Form extends EntityBase {
    type: "form",
    description?: string,
    element: FC
}

export const renderForm = (form: Form) => {
    return [
        form.description,
    ]
}