import {FC, useContext, useMemo} from "react";
import {ChatContext} from "@/app/ChatContext";
import {z} from "zod";
import {getSchema} from "@/data/schema";
import {PromptSuggestion} from "@/app/PromptSuggestion";
import {Bed, CalendarClock, FileUser, Info, Languages, Newspaper, PartyPopper} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useTranslations} from "@/app/languages/useTranslations";
import {findSuggestions} from "@/app/ChatMessage";

export const PromptSuggestions: FC = () => {
    const translations = useTranslations();
    const {messages, language} = useContext(ChatContext)!;
    const latest = useMemo(() => {
        if (!messages) return [];
        const m = [...messages.reverse()];
        for (const message of m) {
            try {
                const suggestions = findSuggestions(JSON.parse(message.content))
                if(suggestions.length > 0) return suggestions;
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
        {language !== "German" && <PromptSuggestion submit prompt="Are there any opportunities for non-German speakers?">
            <Languages />
            Opportunities for non-Germans
        </PromptSuggestion>}
        <PromptSuggestion submit prompt={translations.promptSuggestions.general.prompt}>
            <Info/> {translations.promptSuggestions.general.text}
            {/*📚 Generelle Informationen*/}
        </PromptSuggestion>
        <PromptSuggestion submit prompt={translations.promptSuggestions.apology.prompt}>
            <Bed/> {translations.promptSuggestions.apology.text}
        </PromptSuggestion>
        {/*<PromptSuggestion submit prompt="Zeige mir aktuelle Termine.">*/}
        {/*    <Calendar/> Termine*/}
        {/*    📅 Termine*/}
        {/*</PromptSuggestion>*/}
        <PromptSuggestion submit prompt={translations.promptSuggestions.timetable.prompt}>
            <CalendarClock/> {translations.promptSuggestions.timetable.text}
            {/*📝 Stundenplan*/}
        </PromptSuggestion>
        <PromptSuggestion submit prompt={translations.promptSuggestions.events.prompt}>
            <PartyPopper/> {translations.promptSuggestions.events.text}
        </PromptSuggestion>
        <PromptSuggestion submit prompt={translations.promptSuggestions.news.prompt}>
            <Newspaper/> {translations.promptSuggestions.news.text}
        </PromptSuggestion>
        <PromptSuggestion submit prompt={translations.promptSuggestions.signup.prompt}>
            <FileUser/> {translations.promptSuggestions.signup.text}
        </PromptSuggestion>
    </>
}