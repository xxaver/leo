import {useContext} from "react";
import {English} from "@/app/languages/english";
import {German} from "@/app/languages/german";
import {LanguageContext} from "@/app/languages/LanguageContext";

const translations = {
    German,
    English
} as any;

export const useTranslations = () => {
    const {language} = useContext(LanguageContext);
    return (translations[language] || English) as typeof German;
};