import {FC, PropsWithChildren, useContext} from "react";
import {ChatContext} from "@/app/ChatContext";

export const PromptSuggestion: FC<PropsWithChildren<{ prompt: string; submit?: boolean }>> =
    ({prompt, children, submit}) => {
        const {handleSubmit, setInput, inputRef} = useContext(ChatContext)!;
        return <button
            onClick={() => {
                setInput(prompt);
                if (submit) handleSubmit();
                else inputRef.current?.focus();
            }}
            className="[&>svg]:stroke-red-600 flex items-center gap-2 text-gray-700 font-semibold bg-white p-3 rounded-lg border border-gray-200 hover:border-red-500 transition-colors text-left">
           {children}
        </button>
    }