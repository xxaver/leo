import {FC, PropsWithChildren, useContext} from "react";
import {ChatContext} from "@/app/ChatContext";

export const PromptSuggestion: FC<PropsWithChildren<{ prompt: string; submit?: boolean }>> =
    ({prompt, children}) => {
        const submit = true;
        const {setInput, inputRef, append, status} = useContext(ChatContext)!;

        return <button
            onClick={() => {
                if(status !== "ready") return;
                if (submit) {
                    append({
                        role: "user",
                        content: prompt,
                    });
                } else {
                    inputRef.current?.focus();
                    setInput(prompt);
                }
            }}
            className={"hover:bg-accent whitespace-nowrap line-clamp-1 overflow-ellipsis [&>svg]:stroke-red-600 [&>svg]:shrink-0 flex items-center gap-2 text-gray-700 font-semibold bg-white p-2 px-3 rounded-lg border border-red-600 hover:border-red-500 transition-colors text-left " + (status !== "ready" ? "opacity-70" : "cursor-pointer")}>
            {children}
        </button>
    }