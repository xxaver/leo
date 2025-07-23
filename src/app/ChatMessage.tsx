"use client";
import {FC, Fragment, useContext} from "react";
import {UIMessage} from "ai";
import {ArrowUpRight, Globe, LucideFile, User} from "lucide-react";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {parsePartial} from "@/app/partial";
import {getSchema} from "@/data/schema";
import {z} from "zod";
import {PromptSuggestion} from "@/app/PromptSuggestion";
import {EntityView} from "@/data/views/EntityView";
import {all} from "@/data/all";
import {getUrl} from "../../scraper/utils";

import {origins} from "../../scraper/config";
import {decompressUrls} from "@/data/formatUrls";
import {ChatContext} from "@/app/ChatContext";

export const findSuggestions = (parsed: z.infer<ReturnType<typeof getSchema>>) => {
    return parsed?.promptSuggestions || parsed?.parts?.findLast(e => e.promptSuggestions)?.promptSuggestions || [];
}
export const ChatMessageLogo: FC<{
    role: "system" | "user" | "assistant" | "data";
    size?: string;
    outerSize?: string
}> = ({role, size, outerSize}) => {
    return <div
        className={`${outerSize || "w-8 h-8 sm:w-12 sm:h-12"} overflow-hidden rounded-full flex items-center justify-center shadow-md shrink-0 ${
            role === "user" ? "bg-red-500" : "bg-white border border-red-500"
        }`}
    >
        {role === "user" ? (
            <User className={`${size || "w-5 h-5 sm:w-6"} sm:h-6 text-white`}/>
        ) : (
            <Image className={size || "w-5 h-5 sm:w-9 sm:h-9"} src="/logo.png" alt="Leo" width={96} height={96}
                   priority/>
        )}
    </div>

}
export const ChatMessage: FC<{ message: UIMessage }> = ({message}) => {
    const chat = useContext(ChatContext)!;
    const [complete, parsed_] = parsePartial<z.infer<ReturnType<typeof getSchema>>>(message.content);
    const parsed = (message.role === "assistant" && parsed_) || {
        parts: [{text: message.content}],
    };
    const suggestions = findSuggestions(parsed_);

    return <div
        className={`mb-6 flex ${message.role === "user" ? "sm:justify-end" : "sm:justify-start"} justify-stretch`}>
        <div
            className={`flex flex-col gap-3 max-w-full sm:max-w-[85%] ${message.role === "user" ? "sm:flex-row-reverse items-end sm:items-start w-full sm:w-max" : "sm:flex-row items-start w-max"}`}
        >
            <div
                className={"flex items-center gap-2 shrink-0 max-w-full " + (message.role === "user" ? "flex-row-reverse" : "")}>
                <ChatMessageLogo role={message.role}/>
                <div className="sm:hidden">
                    {message.role === "user" ? "Du" : "Leo"}
                </div>
            </div>
            <div className="max-w-full">
                <div
                    className={`p-3 rounded-2xl shadow-sm flex flex-col gap-3 ${
                        message.role === "user"
                            ? "bg-red-500 text-white"
                            : "bg-gray-50 text-gray-800 border border-gray-200"
                    }`}
                >
                    {parsed?.parts?.map((part, i) => {
                        return <Fragment key={i}>
                            {part.text && <div
                                className="flex flex-col gap-2 leading-relaxed markdown @xl/chat:text-lg"
                                onClick={e => {
                                    const target = e.target as HTMLAnchorElement;
                                    if (target.tagName !== "A" || !target.href.startsWith("https://")) return;
                                    e.preventDefault();
                                    window.open(target.href, "_blank");
                                }}
                            >
                                <Markdown remarkPlugins={[remarkGfm]}>{part.text
                                    // .replace(/([.,!?;:])/g, '$1 ')
                                }</Markdown>
                                {/*{part.text}*/}
                            </div>}
                            {part.showImages && part.showImages.length > 0 &&
                                <div className="flex gap-2 items-start">
                                    {part.showImages.map((e, i) => {
                                        return <div className="w-40 @xl/chat:w-96 text-xs @xl/chat:text-sm">
                                            <img
                                                key={i}
                                                src={decompressUrls(getUrl(e.url, origins[0]))}
                                                alt={e.description}
                                                // width={500}
                                                title={e.description}
                                                // className="rounded-md"
                                                onClick={() => chat.setShowImage(e)}
                                                className="object-cover h-40 w-40 @xl/chat:w-96 @xl/chat:h-96 rounded-sm cursor-pointer"
                                            />
                                            <div
                                                className="text-muted-foreground p-1 text-center">{e.description}</div>
                                        </div>
                                    })}
                                </div>}
                            {part.showDocuments && part.showDocuments.length > 0 &&
                                <div className="flex gap-2 flex-wrap items-start text-sm ">
                                    {part.showDocuments.map((e, i) => {
                                        return <a
                                            target="_blank"
                                            key={i}
                                            href={decompressUrls(getUrl(e.url, origins[0]))}
                                            className="border rounded-md p-2 py-1.5 bg-white !text-foreground flex items-center gap-2 not-hover:!no-underline">
                                            {e.url?.endsWith(".pdf") ? <LucideFile className="shrink-0"/> : <Globe className="shrink-0"/>}
                                            {e.description}
                                            <ArrowUpRight/>
                                        </a>
                                    })}
                                </div>}
                            {(part.showDetails?.length || 0) > 0 && <div className="grid gap-2 flex-wrap my-3" style={{
                                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
                            }}>
                                {part.showDetails.map((e, i) => {
                                    const el = all.find(a => a.id === e.id);
                                    return el && <EntityView key={i} entity={el} size={"small"}/>
                                })}
                            </div>}
                        </Fragment>
                    })}
                </div>
                {suggestions && suggestions.length > 0 &&
                    <div className="flex items-center gap-2 mt-3 flex-wrap text-sm @xl/chat:text-lg">
                        {suggestions.map((suggestion, i) => {
                            return suggestion.full &&
                                <PromptSuggestion prompt={suggestion.full} key={i} submit={!suggestion.editable}>
                                    {suggestion.short || suggestion.full}
                                </PromptSuggestion>
                        })}
                    </div>}
            </div>
        </div>
    </div>
}