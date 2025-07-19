import {FC} from "react";
import Image from "next/image";
import {PromptSuggestion} from "@/app/PromptSuggestion";
import {Calendar, CalendarClock, FileUser, Info, Newspaper, PartyPopper} from "lucide-react";

export const Suggestions: FC = () => {
    return <>
        <PromptSuggestion prompt="Erzähle mir mehr über das Gymnasium Weingarten und seine Einrichtungen">
            <Info/> Generelle Informationen
            {/*📚 Generelle Informationen*/}
        </PromptSuggestion>
        {/*<PromptSuggestion prompt="Zeige mir aktuelle Termine.">*/}
        {/*    <Calendar/> Termine*/}
        {/*    📅 Termine*/}
        {/*</PromptSuggestion>*/}
        <PromptSuggestion prompt="Wie sieht ein typischer Stundenplan aus?">
            <CalendarClock/> Stundenplan
            {/*📝 Stundenplan*/}
        </PromptSuggestion>
        <PromptSuggestion prompt="Welche Veranstaltungen finden demnächst statt?">
            <PartyPopper/> Veranstaltungen
        </PromptSuggestion>
        <PromptSuggestion prompt="Was gibt's neues?">
            <Newspaper/> Neuigkeiten
        </PromptSuggestion>
        <PromptSuggestion prompt="Wie melde ich mein Kind an?">
            <FileUser/> Wie melde ich mein Kind an?
        </PromptSuggestion>
    </>
}
export const Welcome: FC = () => {
    return <div className="flex h-full flex-col justify-center">
        <div className="bg-white md:mx-6 my-6 rounded-xl amd:shadow-lg amd:border border-gray-200 flex flex-col">
            <div className="text-center py-24 justify-self-center">
                <div
                    className="bg-white w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg border-2 border-red-500">
                    <Image src="/logo.png" alt="Leo" width={60} height={60}/>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">Hallo! Ich
                    bin {process.env.NEXT_PUBLIC_ASSISTANT_NAME} 🦁</h2>
                <h3 className="mb-4 text-muted-foreground">
                    der Chat-Assistent des Gymnasium Weingartens,<br/>
                    der im Rahmen der Projekttage 2025 zum 50-jährigen Jubiläum <br/> des Gymnasiums Weingarten
                    entwickelt wurde.
                </h3>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-w-2xl mx-auto">
                    {/*<p className="text-lg text-gray-700 mb-3">Willkommen beim Chat-Assistenten des Gymnasium Weingarten!</p>*/}
                    <p className="text-gray-600 mb-4">Ich helfe dir gerne bei Fragen zu:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                        <Suggestions/>
                    </div>
                    <p className="text-red-500 mt-4 font-semibold">Stell mir einfach deine Frage!</p>
                </div>
            </div>
        </div>
    </div>
}