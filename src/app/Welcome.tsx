import {FC} from "react";
import Image from "next/image";
import {PromptSuggestions} from "@/app/PromptSuggestions";
import {useTranslations} from "@/app/languages/useTranslations";

export const Welcome: FC = () => {
    const translations = useTranslations();
    return <div className="flex flex-col justify-center">
        <div className="bg-white md:mx-6 my-6 rounded-xl amd:shadow-lg amd:border border-gray-200 flex flex-col">
            <div className="text-center justify-self-center">
                <div
                    className="bg-white w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg border-2 border-red-500">
                    <Image src="/logo.png" alt="Leo" width={60} height={60}/>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">{translations.welcome.h1}</h1>
                <div className="mb-4 text-muted-foreground flex justify-center">
                    <div className="max-w-[40em]">
                        {translations.welcome.subtitle}
                    </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-w-2xl mx-auto">
                    {/*<p className="text-lg text-gray-700 mb-3">Willkommen beim Chat-Assistenten des Gymnasium Weingarten!</p>*/}
                    <p className="text-gray-600 mb-4">{translations.welcome.help}</p>
                    <div className="grid grid-cols-1 gap-3 text-left">
                        <PromptSuggestions/>
                    </div>
                    <p className="text-red-500 mt-4 font-semibold">{translations.welcome.help2}</p>
                </div>
            </div>
        </div>
    </div>
}