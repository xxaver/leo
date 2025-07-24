"use client";

import {FC, useContext, useEffect, useMemo, useRef, useState} from "react";
import {useChat} from "@ai-sdk/react";
import {Welcome} from "@/app/Welcome";
import {ChatInput} from "@/app/ChatInput";
import {ChatMessage, ChatMessageLogo} from "@/app/ChatMessage";
import {ChatContext, ShowImage} from "@/app/ChatContext";
import {ChatDropdownMenu} from "@/app/ChatDropdownMenu";
import {languages} from "@/app/languages/languages";
import {AlertCircle, ArrowUpRight, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {languageHeader} from "@/data/languageHeader";
import {Footer} from "@/app/Footer";
import {Header} from "@/app/Header";
import {LanguageContext} from "@/app/languages/LanguageContext";

export const Chat: FC<{ onClose?: () => void }> = ({onClose}) => {
    const {language} = useContext(LanguageContext);
    const [showImage, setShowImage] = useState<null | ShowImage>(null);

    const chat = useChat({
        headers: {
            [languageHeader]: language
        }
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLInputElement>(null);
    const {status} = chat;
    const messages = useMemo(() => [...chat.messages].sort((a, b) => a.createdAt!.valueOf() - b.createdAt!.valueOf()), [chat.messages])

    const initialized = useRef(false);
    useEffect(() => {
        const messages = sessionStorage.getItem("ai-messages");
        if (messages) {
            chat.setMessages(JSON.parse(messages));
        }
        initialized.current = true;
    }, []);
    useEffect(() => {
        if (messages.length) sessionStorage.setItem("ai-messages", JSON.stringify(messages));
        if (messages.length) scrollRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
    }, [messages]);


    return <ChatContext value={{...chat, inputRef, showImage, setShowImage}}>
        {showImage && <>
            <div
                className="absolute top-0 left-0 w-full h-full flex-col bg-black/70 z-10 flex items-center justify-center gap-2 p-6"
                onClick={() => setShowImage(null)}>
                <div className="flex self-stretch">
                    <div className="grow"/>
                    <div>
                        <button className="text-white transition hover:scale-120 cursor-pointer">
                            <X/>
                        </button>
                    </div>
                </div>
                <img src={showImage.url} alt={showImage.description} className="grow object-contain min-h-0"/>
                {showImage.description && <div className="text-background">{showImage.description}</div>}
            </div>
        </>}

        <Header items={<>
            <ChatDropdownMenu/>
            {onClose && <>
                <Button asChild variant="ghost" size="icon" className="shrink-0 cursor-pointer">
                    <a href="/" target="_blank" className="!text-foreground">
                        <ArrowUpRight/>
                    </a>
                </Button>
                <Button onClick={onClose} variant="ghost" size="icon" className="shrink-0 cursor-pointer">
                    <X/>
                </Button>
            </>}
        </>}>

            <div className="flex-1 p-6 overflow-auto min-h-0 flex flex-col">
                {messages.length === 0 && <Welcome/>}
                {messages.map((message, i) => <ChatMessage message={message} key={message.id || i}/>)}

                {(status === "submitted" || status === "error") && (
                    <div className="flex justify-start mb-6">
                        <div className="flex items-start gap-3">
                            <ChatMessageLogo role="assistant"/>
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl shadow-sm">
                                <div className="flex gap-2">
                                    {status === "error"
                                        ? <>
                                            <AlertCircle className="text-red-600 shrink-0"/>
                                            <div className="text-red-600">
                                                Ein unerwarteter Fehler ist aufgetreten. Vielleicht bin ich
                                                überlastet...
                                            </div>
                                        </>
                                        : <>
                                            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                                            <div
                                                className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
                                                style={{animationDelay: "0.1s"}}
                                            ></div>
                                            <div
                                                className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
                                                style={{animationDelay: "0.2s"}}
                                            ></div>
                                        </>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={scrollRef}/>
                <div className="grow"/>
                <Footer/>
            </div>
            <ChatInput/>
        </Header>
    </ChatContext>
}