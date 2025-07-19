import {FC, useContext, useMemo} from "react";
import {ChatContext} from "@/app/ChatContext";
import {z} from "zod";
import {getSchema} from "@/data/schema";
import {PromptSuggestion} from "@/app/PromptSuggestion";
import {CalendarClock, FileUser, Info, Newspaper, PartyPopper} from "lucide-react";
import {Separator} from "@/components/ui/separator";

export const PromptSuggestions: FC = () => {
    const {messages} = useContext(ChatContext)!;
    const latest = useMemo(() => {
        console.log(messages)
        if (!messages) return [];
        const m = [...messages.reverse()];
        for (const message of m) {
            try {
                return (JSON.parse(message.content) as z.infer<ReturnType<typeof getSchema>>).promptSuggestions || [];
            } catch {
            }
        }
        return [];
    }, [messages])

    return <>
        {latest.map((suggestion, i) => <PromptSuggestion key={i} prompt={suggestion.full}
                                                         submit={!suggestion.editable}>{suggestion.short || suggestion.full}
        </PromptSuggestion>)}
        {latest.length > 0 && <Separator orientation="vertical" className="bg-red-300 !h-[42px] mx-1"/>}
        <PromptSuggestion submit prompt="Erzähle mir mehr über das Gymnasium Weingarten und seine Einrichtungen">
            <Info/> Generelle Informationen
            {/*📚 Generelle Informationen*/}
        </PromptSuggestion>
        {/*<PromptSuggestion submit prompt="Zeige mir aktuelle Termine.">*/}
        {/*    <Calendar/> Termine*/}
        {/*    📅 Termine*/}
        {/*</PromptSuggestion>*/}
        <PromptSuggestion submit prompt="Wie sieht ein typischer Stundenplan aus?">
            <CalendarClock/> Stundenplan
            {/*📝 Stundenplan*/}
        </PromptSuggestion>
        <PromptSuggestion submit prompt="Welche Veranstaltungen finden demnächst statt?">
            <PartyPopper/> Veranstaltungen
        </PromptSuggestion>
        <PromptSuggestion submit prompt="Was gibt's neues?">
            <Newspaper/> Neuigkeiten
        </PromptSuggestion>
        <PromptSuggestion submit prompt="Wie melde ich mein Kind an?">
            <FileUser/> Wie melde ich mein Kind an?
        </PromptSuggestion>
    </>
}