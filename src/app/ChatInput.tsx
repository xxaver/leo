import {FC, useContext} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {ChatContext} from "@/app/ChatContext";
import {Suggestions} from "@/app/Welcome";

export const ChatInput: FC = () => {
    const {handleSubmit, input, handleInputChange, inputRef, messages} = useContext(ChatContext)!;
    return <>
        {messages.length > 0 && <div className="flex gap-2 p-2 border-t bg-accent">
            <Suggestions />
        </div>}
        <form onSubmit={handleSubmit} className="flex gap-3 border-t p-3 py-5 items-center ">
            <Input ref={inputRef} name="prompt" value={input} placeholder="Wie kann ich dir behilflich sein?"
                   className="grow text-lg p-6" onChange={handleInputChange}/>
            <Button asChild variant="destructive">
                <button type="submit" className="text-xl !p-6">
                    Senden
                    <Send size={96} className="!h-6 !w-6"/>
                </button>
            </Button>
        </form>
    </>
}