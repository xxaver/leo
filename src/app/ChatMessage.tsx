"use client";
import {FC, Fragment} from "react";
import {UIMessage} from "ai";
import {User} from "lucide-react";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {parsePartial} from "@/app/partial";
import {getSchema} from "@/data/schema";
import {z} from "zod";
import {PromptSuggestion} from "@/app/PromptSuggestion";
import {EntityView} from "@/data/views/EntityView";
import {all} from "@/data/all";

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
    const [complete, parsed_] = parsePartial<z.infer<ReturnType<typeof getSchema>>>(message.content);
    const parsed = message.role === "assistant" ? parsed_ : {
        parts: [{text: message.content}],
    };

    return <div
        className={`mb-6 flex ${message.role === "user" ? "sm:justify-end" : "sm:justify-start"} justify-stretch`}>
        <div
            className={`flex flex-col gap-3 max-w-full sm:max-w-[85%] w-max ${message.role === "user" ? "sm:flex-row-reverse items-end sm:items-start" : "sm:flex-row items-start"}`}
        >
            <div className={"flex items-center gap-2 shrink-0 max-w-full " + (message.role === "user" ? "flex-row-reverse" : "")}>
                <ChatMessageLogo role={message.role}/>
                <div className="sm:hidden">
                    {message.role === "user" ? "Du" : "Leo"}
                </div>
            </div>
            <div className="max-w-full">
                <div
                    className={`p-3 rounded-2xl shadow-sm ${
                        message.role === "user"
                            ? "bg-red-500 text-white"
                            : "bg-gray-50 text-gray-800 border border-gray-200"
                    }`}
                >
                    {parsed?.parts?.map((part, i) => {
                        return <Fragment key={i}>
                            {part.text && <div
                                className="flex flex-col gap-2 leading-relaxed"
                                onClick={e => {
                                    const target = e.target as HTMLAnchorElement;
                                    if (target.tagName !== "A" || !target.href.startsWith("https://")) return;
                                    e.preventDefault();
                                    window.open(target.href, "_blank");
                                }}
                            >
                                <Markdown remarkPlugins={[remarkGfm]}>{part.text}</Markdown>
                                {/*{part.text}*/}
                            </div>}
                            {(part.showDetails?.length || 0) > 0 && <div className="flex gap-2 flex-wrap my-3" style={{
                                // gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            }}>
                                {part.showDetails.map((e, i) => {
                                    const el = all.find(a => a.id === e.id);
                                    return el && <EntityView key={i} entity={el} size={e.size}/>
                                })}
                            </div>}
                        </Fragment>
                    })}
                </div>
                {complete && parsed?.promptSuggestions && parsed.promptSuggestions.length > 0 &&
                    <div className="flex items-center gap-2 mt-3">
                        {parsed?.promptSuggestions?.map((suggestion, i) => {
                            return <PromptSuggestion prompt={suggestion.full} key={i} submit={!suggestion.editable}>
                                {suggestion.short || suggestion.full}
                            </PromptSuggestion>
                        })}
                    </div>}
            </div>
        </div>
    </div>
}