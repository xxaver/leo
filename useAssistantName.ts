"use client";

import {useSearchParams} from "next/navigation";

export const useAssistantName = () => {
    const params = useSearchParams();
    return params.get("name") || "Johannes";
};