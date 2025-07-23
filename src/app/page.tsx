"use client";
import {Chat} from "@/app/Chat";
import {useSearchParams} from "next/navigation";

export default function Home() {
    const params = useSearchParams();
    return <Chat onClose={params.get("embedded") ? () => {
        parent.postMessage({action: "leo-close"}, "*")
    } : undefined}/>
}
