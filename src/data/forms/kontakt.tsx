import {FC} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

export const KontaktForm: FC = () => {
    return <form action="" className="flex items-stretch gap-3 flex-col">
        <div>
            <div>Name:</div>
            <Input type="text" placeholder="Vorname Nachname"/>
        </div>
        <div>
            <div>E-Mail:</div>
            <Input type="text" placeholder="email@adresse.de"/>
        </div>
        <div>
            <div>Nachricht:</div>
            <Textarea placeholder="Ihre Nachricht"/>
        </div>
        <div>
            <Button asChild>
                <input type="submit" value="Senden"/>
            </Button>
        </div>
    </form>
}