"use client";


import {FC, useContext} from "react";
import {languageHeader} from "@/data/languageHeader";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {languages} from "@/app/languages/languages";

import {LanguageContext} from "@/app/languages/useTranslations";

export const LanguagePicker: FC = () => {
    const {language, setLanguage} = useContext(LanguageContext);
    const selected = languages.find(e => e.englishName === language);
    
    return <Select value={language} onValueChange={(e) => {
        setLanguage(e)
        localStorage.setItem(languageHeader, e);
    }}>
        <SelectTrigger>
            {selected ? <>
                {selected.flag}
                {" "}
                <div className="hidden xs:block">{selected.nativeName}</div>
            </> : "Sprache"}
        </SelectTrigger>
        <SelectContent>
            {languages.map((lang) => <SelectItem key={lang.code} value={lang.englishName}>
                {lang.flag}
                {" "}
                {lang.nativeName}
            </SelectItem>)}
        </SelectContent>
    </Select>
}