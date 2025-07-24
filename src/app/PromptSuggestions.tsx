import {FC, useContext, useMemo} from "react";
import {ChatContext} from "@/app/ChatContext";
import {PromptSuggestion} from "@/app/PromptSuggestion";
import {Bed, CalendarClock, FileUser, Info, Languages, Newspaper, PartyPopper} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useTranslations} from "@/app/languages/useTranslations";
import {findSuggestions} from "@/app/ChatMessage";
import {LanguageContext} from "@/app/languages/LanguageContext";

export const PromptSuggestions: FC = () => {
    const translations = useTranslations();
    const {language} = useContext(LanguageContext)!;
    const {messages} = useContext(ChatContext)!;
    const latest = useMemo(() => {
        if (!messages) return [];
        const m = [...messages.reverse()];
        for (const message of m) {
            try {
                const suggestions = findSuggestions(JSON.parse(message.content))
                if (suggestions.length > 0) return suggestions;
            } catch {
            }
        }
        return [];
    }, [messages])

    const date = new Date();
    const isSchulfest = (date.getMonth() === 6 && date.getDate() === 25 && date.getFullYear() === 2025) || process.env.NODE_ENV === "development";

    return <>
        {latest.map((suggestion, i) => <PromptSuggestion key={i} prompt={suggestion.full}
                                                         submit={!suggestion.editable}>{suggestion.short || suggestion.full}
        </PromptSuggestion>)}
        {latest.length > 0 && <Separator orientation="vertical" className="bg-primary/30 !h-[42px] mx-1"/>}
        {isSchulfest && <>
            <PromptSuggestion red submit prompt={translations.promptSuggestions.schoolFestivalSchedule.prompt}>
                <PartyPopper/>
                {translations.promptSuggestions.schoolFestivalSchedule.text}
            </PromptSuggestion>
            <PromptSuggestion red submit prompt={translations.promptSuggestions.schoolFestivalProjects.prompt}>
                <PartyPopper/>
                {translations.promptSuggestions.schoolFestivalProjects.text}
            </PromptSuggestion>
            <PromptSuggestion red submit prompt={translations.promptSuggestions.schoolFestivalFood.prompt}>
                <PartyPopper/>
                {translations.promptSuggestions.schoolFestivalFood.text}
            </PromptSuggestion>
            <div className="h-1 w-1"/>
        </>}
        {language !== "German" && <PromptSuggestion submit prompt={translations.promptSuggestions.nonGerman.prompt}>
            <Languages/>
            {translations.promptSuggestions.nonGerman.text}
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