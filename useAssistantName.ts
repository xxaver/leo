"use client";

import {useSearchParams} from "next/navigation";
import {assistantNameValid} from "./config";

export const useAssistantName = () => {
    const params = useSearchParams();
    const name = params.get("name") || "Albert"
    return assistantNameValid(name) ? name : "Albert";
};