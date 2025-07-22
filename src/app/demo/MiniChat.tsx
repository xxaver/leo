"use client";

import {useEffect, useState} from "react";
import {ChatMessageLogo} from "@/app/ChatMessage";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Bot} from "lucide-react";
import {Chat} from "@/app/Chat";
import {motion} from "framer-motion";

export const MiniChat = () => {
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen_] = useState(false);
    const [showHintStart, setShowHintStart] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const setOpen = (o: boolean) => {
        setOpen_(o);
        sessionStorage.setItem("ai-open", o ? "true" : "");
    }

    useEffect(() => {
        setShowHintStart(!sessionStorage.getItem("ai-hint-hidden"));
        setOpen(sessionStorage.getItem("ai-open"));
        setLoaded(true);
    }, [])
    const hide = () => {
        setShowHintStart(false);
        sessionStorage.setItem("ai-hint-hidden", "true");
    }
    return <div className="fixed right-5 bottom-5"
                onClick={hide}
                onMouseEnter={hide}
    >
        <div
            className="absolute top-0 right-0 sm:-translate-y-full">
            <motion.div
                initial={{opacity: 0, scale: 0.85, display: "none"}}
                animate={open ? {
                    opacity: 1,
                    scale: 1,
                    display: "block",
                } : {
                    opacity: 0,
                    scale: 0.85,
                    display: "none",
                }}
                className={`sm:-translate-y-3 sm:h-[60em] sm:w-[35em] border rounded-md overflow-hidden bg-white shadow-lg origin-bottom-right fixed inset-0 sm:relative`}
                style={{
                    maxHeight: "calc(100vh - 100px)",
                }}>
                {loaded && <Chat onClose={() => setOpen(false)}/>}
            </motion.div>
        </div>
        <Tooltip open={showHint || showHintStart} onOpenChange={setShowHint}>
            <TooltipTrigger onClick={() => {
                console.log("CLICK")
                setOpen(o => !o)
            }} className={`hover:scale-110 transition cursor-pointer ${open ? "hidden sm:block" : ""}`}>
                <ChatMessageLogo role="assistant" outerSize="h-16 w-16" size="h-12 w-12"/>
            </TooltipTrigger>
            <TooltipContent side="left" className="flex items-center gap-3">
                <div className="shrink-0">
                    <Bot/>
                </div>
                <div className="grow">
                    <div className="text-lg font-medium">
                        Hallo, Ich bin {process.env.NEXT_PUBLIC_ASSISTANT_NAME}! 🦁
                    </div>
                    <div className="text-sm hidden md:block">
                        Ich helfe dir gerne bei Fragen rund ums Gymnasium Weingarten
                    </div>
                    <div className="text-sm md:hidden">
                        Ich helfe dir gerne bei Fragen rund<br/>ums Gymnasium Weingarten
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    </div>
}