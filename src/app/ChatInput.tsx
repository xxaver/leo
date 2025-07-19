import {FC, useContext} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {ChatContext} from "@/app/ChatContext";

export const ChatInput: FC = () => {
    const {handleSubmit, input, handleInputChange, inputRef} = useContext(ChatContext)!;
    return <form onSubmit={handleSubmit} className="flex gap-3 border-t p-3 items-center ">
        <Input ref={inputRef} name="prompt" value={input} placeholder="Wie kann ich dir behilflich sein?"
               className="grow text-lg p-5" onChange={handleInputChange}/>
        <Button asChild variant="destructive">
            <button type="submit" className="text-lg p-5">
                Senden
                <Send/>
            </button>
        </Button>
    </form>
}