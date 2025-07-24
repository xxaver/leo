import {useContext} from "react";
import {English} from "@/app/languages/english";
import {German} from "@/app/languages/german";
import {LanguageContext} from "@/app/languages/LanguageContext";
import {French} from "@/app/languages/french";
import {Ukrainian} from "@/app/languages/ukrainian";
import {Russian} from "@/app/languages/russian";
import {Polish} from "@/app/languages/polish";
import {Turkish} from "@/app/languages/turkish";

const translations = {
    German,
    English,
    French,
    Ukrainian,
    Russian,
    Polish,
    Turkish,
} as any;

export const useTranslations = () => {
    const {language} = useContext(LanguageContext);
    return (translations[language] || English) as typeof German;
};