import {FC, useContext} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {ChatContext} from "@/app/ChatContext";

import {PromptSuggestions} from "@/app/PromptSuggestions";
import {ScrollArea} from "@/components/ui/scroll-area";

export const ChatInput: FC = () => {
    const {handleSubmit, input, handleInputChange, inputRef, messages} = useContext(ChatContext)!;
    return <>
        {messages.length > 0 && <div className="overflow-auto min-w-0 border-t bg-accent">
            <div className="flex gap-2 p-2 py-4 px-4 w-max">
                <PromptSuggestions/>
            </div>
        </div>}
        <form onSubmit={handleSubmit} className="flex gap-3 border-t px-3 pt-5 pb-2 items-center ">
            <Input ref={inputRef} name="prompt" value={input} placeholder="👋 Wie kann ich dir behilflich sein?"
                   className="grow md:text-lg p-6" onChange={handleInputChange}/>
            <Button asChild variant="destructive">
                <button type="submit" className="md:text-xl !p-6">
                    <div className="hidden md:shown">Senden</div>
                    <Send size={96} className="md:!h-6 md:!w-6"/>
                </button>
            </Button>
        </form>
        <div className="text-center text-muted-foreground pb-3 text-sm">
            KI macht Fehler. Überprüfe wichtige Informationen.
        </div>
    </>
}