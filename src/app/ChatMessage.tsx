import {FC} from "react";
import {UIMessage} from "ai";
import {User} from "lucide-react";
import Image from "next/image";
import Markdown from "react-markdown";

export const ChatMessageLogo: FC<{ role: "system" | "user" | "assistant" | "data" }> = ({role}) => {
    return <div
        className={`w-8 h-8 sm:w-12 overflow-hidden sm:h-12 rounded-full flex items-center justify-center shadow-md shrink-0 ${
            role === "user" ? "bg-red-500" : "bg-white border border-red-500"
        }`}
    >
        {role === "user" ? (
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
        ) : (
            <Image className="w-5 h-5 sm:w-9 sm:h-9" src="/logo.png" alt="Leo" width={48} height={48}/>
        )}
    </div>

}
export const ChatMessage: FC<{ message: UIMessage }> = ({message}) => {
    return <div
        className={`mb-6 flex ${message.role === "user" ? "sm:justify-end" : "sm:justify-start"} justify-stretch`}>
        <div
            className={`flex flex-col gap-3 sm:max-w-[85%] ${message.role === "user" ? "sm:flex-row-reverse items-end sm:items-start" : "sm:flex-row items-start"}`}
        >
            <div className={"flex items-center gap-2 shrink-0 " + (message.role === "user" ? "flex-row-reverse" : "")}>
                <ChatMessageLogo role={message.role}/>
                <div className="sm:hidden">
                    {message.role === "user" ? "Du" : "Leo"}
                </div>
            </div>
            <div
                className={`p-3 rounded-2xl shadow-sm ${
                    message.role === "user"
                        ? "bg-red-500 text-white"
                        : "bg-gray-50 text-gray-800 border border-gray-200"
                }`}
            >
                {message.parts.map((part, i) => {
                    switch (part.type) {
                        case "text":
                            return (
                                <div key={`${message.id}-${i}`}
                                     className="flex flex-col gap-2 leading-relaxed">
                                    <Markdown>{part.text}</Markdown>
                                    {/*{part.text}*/}
                                </div>
                            )
                        default:
                            return null
                    }
                })}
            </div>
        </div>
    </div>
}