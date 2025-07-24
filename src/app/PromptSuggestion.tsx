import {FC, PropsWithChildren, useContext} from "react";
import {ChatContext} from "@/app/ChatContext";

export const PromptSuggestion: FC<PropsWithChildren<{ prompt: string; submit?: boolean; red?: boolean }>> =
    ({prompt, children, red}) => {
        const submit = true;
        const {setInput, inputRef, append, status} = useContext(ChatContext)!;
        const ready = status === "ready" || status === "error";

        return <button
            onClick={() => {
                if(!ready) return;
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
            className={"whitespace-nowrap line-clamp-1 overflow-ellipsis [&>svg]:shrink-0 flex items-center gap-2 text-gray-700 font-semibold  p-2 px-3 rounded-lg border border-red-600 transition-colors text-left "
                + (!ready ? "opacity-70 " : "cursor-pointer ") 
                + (red ? "bg-red-600 text-white [&>svg]:stroke-white " : "bg-white [&>svg]:stroke-red-600 border-none") 
                + (red && ready ? "hover:bg-red-700 hover:border-red-500" : "")
                + (!red && ready ? "hover:bg-accent" : "")
        }>
            {children}
        </button>
    }