import {useContext} from "react";
import {ChatContext} from "@/app/ChatContext";
import {English} from "@/app/languages/english";
import {Deutsch} from "@/app/languages/deutsch";

export const useTranslations = () => {
    const {language} = useContext(ChatContext)!;
    return language === "German" ? Deutsch : English;
};