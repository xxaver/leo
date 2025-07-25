import {FC, useContext} from "react";
import {useTranslations} from "@/app/languages/useTranslations";
import {ArrowUpRight, Github, MessageCircle} from "lucide-react";
import {LanguageContext} from "@/app/languages/LanguageContext";

export const Footer: FC = () => {
    const translations = useTranslations();
    const {language} = useContext(LanguageContext);
    
    return <div className='text-center text-muted-foreground flex items-center gap-2 justify-center flex-wrap text-xs'>
        <div>
            {translations.footer.madeBy} <span className="text-foreground">Daniel Kuhn</span>
        </div>
        <div>•</div>
        <a target='_blank' className='transition !text-muted-foreground hover:!text-foreground flex items-center gap-1.5 not-hover:!no-underline' href="https://github.com/xxaver/leo">
            <Github />
            {translations.footer.source}
            <ArrowUpRight />
        </a>
        <div>•</div>
        <a target='_blank' className='transition !text-muted-foreground hover:!text-foreground flex items-center gap-1.5 not-hover:!no-underline' href={`/feedback?lang=${language}`}>
            <MessageCircle />
            {translations.footer.feedback}
            <ArrowUpRight />
        </a>
        {/*<div>•</div>*/}
        {/*<a target='_blank' className='transition !text-muted-foreground hover:!text-foreground flex items-center gap-1.5 not-hover:!no-underline' href="/privacy">*/}
        {/*    <Shield />*/}
        {/*    {translations.footer.privacyPolicy}*/}
        {/*    <ArrowUpRight />*/}
        {/*</a>*/}
    </div>
}