import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {EllipsisVertical, RotateCcw} from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {useContext} from "react";
import {ChatContext} from "@/app/ChatContext";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {languages} from "@/app/languages/languages";
import {languageHeader} from "@/data/systemPrompt";
import {useTranslations} from "@/app/languages/useTranslations";

export const ChatDropdownMenu = () => {
    const translations = useTranslations();
    const {setData, setMessages, language, setLanguage} = useContext(ChatContext)!;
    return <>
        <Select value={language} onValueChange={(e) => {
            setLanguage(e)
            localStorage.setItem(languageHeader, e);
        }}>
            <SelectTrigger>
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                {languages.map((lang) => <SelectItem key={lang.code} value={lang.nativeName}>
                    {lang.flag}
                    {" "}
                    {lang.nativeName}
                </SelectItem>)}
            </SelectContent>
        </Select>
        <Drawer>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <EllipsisVertical/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DrawerTrigger asChild>
                        <DropdownMenuItem>
                            <RotateCcw/>
                            {translations.reset.restart}
                        </DropdownMenuItem>
                    </DrawerTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{translations.reset.reset}</DrawerTitle>
                    <DrawerDescription>{translations.reset.description}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">{translations.cancel}</Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                        <Button variant="destructive"
                                onClick={() => {
                                    setData([]);
                                    setMessages([]);
                                }}>{translations.reset.reset}</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}