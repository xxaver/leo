"use client";

import {createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {English as English1} from "@/app/languages/english";
import {German} from "@/app/languages/german";
import {French} from "@/app/languages/french";
import {Ukrainian} from "@/app/languages/ukrainian";
import {Russian} from "@/app/languages/russian";
import {Polish} from "@/app/languages/polish";
import {Turkish} from "@/app/languages/turkish";
import {Hindi} from "@/app/languages/hindi";
import {Urdu} from "@/app/languages/urdu";
import {Spanish} from "@/app/languages/spanish";
import {Afrikaans} from "./afrikaans";
import {Amharic} from "./amharic";
import {Azerbaijani} from "./azerbaijani";
import {Belarusian} from "./belarusian";
import {Bengali} from "./bengali";
import {Bulgarian} from "./bulgarian";
import {Catalan} from "./catalan";
import {Albanian} from "@/app/languages/albanian";
import {Arabic} from "@/app/languages/arabic";
import {Chinese} from "@/app/languages/chinese";
import {Croatian} from "@/app/languages/croatian";
import {Czech} from "@/app/languages/czech";
import {Danish} from "@/app/languages/danish";
import {Dutch} from "@/app/languages/dutch";
import {Estonian} from "@/app/languages/estonian";
import {Finnish} from "@/app/languages/finnish";
import {Georgian} from "@/app/languages/georgian";
import {Greek} from "@/app/languages/greek";
import {Gujarati} from "@/app/languages/gujarati";
import {Hebrew} from "@/app/languages/hebrew";
import {Hungarian} from "@/app/languages/hungarian";
import {Indonesian} from "@/app/languages/indonesian";
import {Italian} from "@/app/languages/italian";
import {Japanese} from "@/app/languages/japanese";
import {Kazakh} from "@/app/languages/kazakh";
import {Khmer} from "@/app/languages/khmer";
import {Korean} from "@/app/languages/korean";
import {Lao} from "@/app/languages/lao";
import {Latvian} from "@/app/languages/latvian";
import {Lithuanian} from "@/app/languages/lithuanian";
import {Malay} from "@/app/languages/malay";
import {Malayalam} from "@/app/languages/malayalam";
import {Marathi} from "@/app/languages/marathi";
import {Mongolian} from "@/app/languages/mongolian";
import {Nepali} from "@/app/languages/nepali";
import {Norwegian} from "@/app/languages/norwegian";
import {Persian} from "@/app/languages/persian";
import {Portuguese} from "@/app/languages/portuguese";
import {Punjabi} from "@/app/languages/punjabi";
import {Romanian} from "@/app/languages/romanian";
import {Serbian} from "@/app/languages/serbian";
import {Sinhala} from "@/app/languages/sinhala";
import {Slovak} from "@/app/languages/slovak";
import {Slovenian} from "@/app/languages/slovenian";
import {Swahili} from "@/app/languages/swahili";
import {Swedish} from "@/app/languages/swedish";
import {Tamil} from "@/app/languages/tamil";
import {Telugu} from "@/app/languages/telugu";
import {Thai} from "@/app/languages/thai";
import {Uzbek} from "@/app/languages/uzbek";
import {Vietnamese} from "@/app/languages/vietnamese";
import {Zulu} from "@/app/languages/zulu";
import {merge} from "@/utils";
import {schoolName, useAssistantName} from "../../../config";
import {languages} from "@/app/languages/languages";
import {useSearchParams} from "next/navigation";
import {languageHeader} from "@/data/languageHeader";

const English = merge(English1, German);

const translations = {
    German,
    English,
    French,
    Ukrainian,
    Russian,
    Polish,
    Turkish,
    Hindi,
    Urdu,
    Spanish,
    Afrikaans,
    Albanian,
    Amharic,
    Arabic,
    Azerbaijani,
    Belarusian,
    Bengali,
    Bulgarian,
    Catalan,
    Chinese,
    Croatian,
    Czech,
    Danish,
    Dutch,
    Estonian,
    Finnish,
    Georgian,
    Greek,
    Gujarati,
    Hebrew,
    Hungarian,
    Indonesian,
    Italian,
    Japanese,
    Kazakh,
    Khmer,
    Korean,
    Lao,
    Latvian,
    Lithuanian,
    Malay,
    Malayalam,
    Marathi,
    Mongolian,
    Nepali,
    Norwegian,
    Persian,
    Portuguese,
    Punjabi,
    Romanian,
    Serbian,
    Sinhala,
    Slovak,
    Slovenian,
    Swahili,
    Swedish,
    Tamil,
    Telugu,
    Thai,
    Uzbek,
    Vietnamese,
    Zulu,
} as any;


export const LanguageContext = createContext<{
    language: string;
    setLanguage: (language: string) => void;
    translations: typeof German;
}>(null as any);
export const useTranslations = () => {
    return useContext(LanguageContext).translations;
};
const getLanguage = () => {
    const lang = navigator.languages.map(e => e.split("-")[0])
    for (const l of lang) {
        const found = languages.find(e => e.code === l);
        if (found) return found.englishName;
    }
    return "English";
}
export const LanguageProvider: FC<PropsWithChildren<{}>> = ({children}) => {
    const [language, setLanguage] = useState("German");
    const langParam = useSearchParams().get("lang");

    useEffect(() => {
        if (langParam) localStorage.setItem(languageHeader, langParam);
        setLanguage(langParam || localStorage.getItem(languageHeader) || getLanguage());
    }, [langParam]);

    const assistantName = useAssistantName();
    const translated = useMemo<typeof German>(() =>
        merge(translations[language] || English, English, a => a
            .replaceAll("{assistantName}", assistantName)
            .replaceAll("{schoolName}", schoolName)
        ), [assistantName, language])

    return <LanguageContext value={{language, setLanguage, translations: translated}}>
        {children}
    </LanguageContext>
}