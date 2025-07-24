"use client"

import {FC, PropsWithChildren, useEffect, useState} from "react";
import {LanguageContext} from "@/app/languages/LanguageContext";
import {languageHeader} from "@/data/languageHeader";
import {languages} from "@/app/languages/languages";

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
    useEffect(() => {
        setLanguage(localStorage.getItem(languageHeader) || getLanguage());
    }, []);
    
    return <LanguageContext value={{language, setLanguage}}>
        {children}
    </LanguageContext>
}