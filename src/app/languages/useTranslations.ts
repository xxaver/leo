import {useContext} from "react";
import {English as English1} from "@/app/languages/english";
import {German} from "@/app/languages/german";
import {LanguageContext} from "@/app/languages/LanguageContext";
import {French} from "@/app/languages/french";
import {Ukrainian} from "@/app/languages/ukrainian";
import {Russian} from "@/app/languages/russian";
import {Polish} from "@/app/languages/polish";
import {Turkish} from "@/app/languages/turkish";

const merge = (p: any, c: any) => {
    const newObj = {...p};
    for(const key in c) {
        if(p[key] === undefined) newObj[key] = c[key];
        else if(typeof p[key] === "object") newObj[key] = merge(p[key], c[key]);
    }
    return newObj;
}
const English = merge(English1, German);

const translations = {
    German,
    English,
    French,
    Ukrainian,
    Russian,
    Polish,
    Turkish,
} as any;
for(const key in translations) {
    translations[key] = merge(translations[key], English);
}


export const useTranslations = () => {
    const {language} = useContext(LanguageContext);
    return (translations[language] || English) as typeof German;
};