"use client";

import {FC, useRef} from "react";
import {useChat} from "@ai-sdk/react";
import Image from "next/image";
import {Welcome} from "@/app/Welcome";
import {ChatInput} from "@/app/ChatInput";
import {ChatMessage} from "@/app/ChatMessage";
import {ChatContext} from "@/app/ChatContext";

export const Chat: FC = () => {
    const chat = useChat();
    const inputRef = useRef<HTMLInputElement>(null);
    const {messages, status} = chat;

    return <ChatContext value={{...chat, inputRef}}>
        <div className="flex-1 p-6 overflow-auto min-h-0">
            {messages.length === 0 && <Welcome/>}
            {messages.map((message) => <ChatMessage message={message} key={message.id}/>)}

            {(status === "submitted" || status === "error") && (
                <div className="flex justify-start mb-6">
                    <div className="flex items-start gap-3">
                        <div
                            className="w-12 h-12 rounded-full bg-white border border-red-500 flex items-center justify-center shadow-md">
                            <Image src="/logo.png" alt="Leo" width={24} height={24}/>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl shadow-sm">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                                <div
                                    className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
                                    style={{animationDelay: "0.1s"}}
                                ></div>
                                <div
                                    className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
                                    style={{animationDelay: "0.2s"}}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <ChatInput/>
    </ChatContext>
}