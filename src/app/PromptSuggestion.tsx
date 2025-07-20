import {FC, PropsWithChildren, useContext, useMemo} from "react";
import {ChatContext} from "@/app/ChatContext";
import {getSchema} from "@/data/schema";
import {z} from "zod";

export const PromptSuggestion: FC<PropsWithChildren<{ prompt: string; submit?: boolean }>> =
    ({prompt, children, submit}) => {
        const {setInput, inputRef, append} = useContext(ChatContext)!;
        
        return <button
            onClick={() => {
                if (submit) {
                    append({
                        role: "user",
                        content: prompt,
                    });
                }
                else {
                    inputRef.current?.focus();
                    setInput(prompt);
                }
            }}
            className="cursor-pointer hover:bg-accent whitespace-nowrap line-clamp-1 overflow-ellipsis [&>svg]:stroke-red-600 [&>svg]:shrink-0 flex items-center gap-2 text-gray-700 font-semibold bg-white p-2 px-3 rounded-lg border border-red-600 hover:border-red-500 transition-colors text-left">
           {children}
        </button>
    }