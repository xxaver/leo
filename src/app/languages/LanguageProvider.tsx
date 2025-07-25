"use client"

import {FC, PropsWithChildren, useEffect, useState} from "react";
import {LanguageContext} from "@/app/languages/LanguageContext";
import {languageHeader} from "@/data/languageHeader";
import {languages} from "@/app/languages/languages";
import {useSearchParams} from "next/navigation";

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
        if(langParam) localStorage.setItem(languageHeader, langParam);
        setLanguage(langParam || localStorage.getItem(languageHeader) || getLanguage());
    }, [langParam]);
    
    return <LanguageContext value={{language, setLanguage}}>
        {children}
    </LanguageContext>
}