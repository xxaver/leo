"use client";
import {Chat} from "@/app/Chat";
import {generateSystemPrompt} from "@/data/systemPrompt";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

export default function Home() {
    const params = useSearchParams();
    const [ok, setOk] = useState(false)
    useEffect(() => {
        setOk(true)
    }, []);
    return ok && <Chat onClose={params.get("embedded") ? () => {
        parent.postMessage({action: "leo-close"}, "*")
    } : undefined}/>
}
