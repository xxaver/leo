import {FC, useContext} from "react";
import {Button} from "@/components/ui/button";
import {Send, Square} from "lucide-react";
import {ChatContext} from "@/app/ChatContext";

import {PromptSuggestions} from "@/app/PromptSuggestions";
import {useTranslations} from "@/app/languages/useTranslations";
import {Textarea} from "@/components/ui/textarea";

export const ChatInput: FC = () => {
    const translations = useTranslations();
    const {handleSubmit, input, handleInputChange, inputRef, messages, stop, status} = useContext(ChatContext)!;
    const ready = status === "ready" || status === "error";
    const Icon = ready ? Send : Square;
    return <>
        {messages.length > 0 && <div className="overflow-auto min-w-0 border-t bg-accent">
            <div className="flex gap-2 p-2 @xs/py-4 px-4 w-max text-sm @xl/chat:text-base">
                <PromptSuggestions/>
            </div>
        </div>}
        <form onSubmit={(e) => {
            e.preventDefault();
            if (ready) handleSubmit(e)
            else stop();
        }} className="flex gap-3 border-t px-3 pt-5 pb-2 items-center ">
            <Textarea onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e)
                }
            }} ref={inputRef} rows={1} name="prompt" value={input} placeholder={translations.input.placeholder}
                      className="grow md:text-lg px-6 py-2.5 min-h-[50px]" onChange={handleInputChange}/>
            <Button asChild>
                <button type="submit" className="md:text-xl !p-6">
                    {/*<div className="hidden md:block">{translations.input.send}</div>*/}
                    <Icon size={96} className="md:!h-6 md:!w-6"/>
                </button>
            </Button>
        </form>
        <div className="text-center text-muted-foreground pb-3 text-sm">
            {translations.input.warning}
        </div>
    </>
}