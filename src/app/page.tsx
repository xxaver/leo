import Image from "next/image";
import {Chat} from "@/app/Chat";
import {ChatMessageLogo} from "@/app/ChatMessage";
import {systemPrompt} from "@/data/systemPrompt";

export default function Home() {
    console.log(systemPrompt)
    return (
        <div className="flex flex-col h-screen">
            <div className="border-b p-3 font-medium text-2xl flex items-center gap-3">
                <ChatMessageLogo role="assistant" />
                <h1>{process.env.NEXT_PUBLIC_ASSISTANT_NAME}</h1>
            </div>
            <Chat/>
        </div>
    );
}
