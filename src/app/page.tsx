"use client";
import {Chat} from "@/app/Chat";
import {generateSystemPrompt} from "@/data/systemPrompt";
import {useEffect, useState} from "react";

export default function Home() {
    const [ok, setOk] = useState(false)
    useEffect(() => {
        setOk(true)
    }, []);
    // console.log(generateSystemPrompt())
    return ok && <Chat/>
}
