import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
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
import {useContext, useEffect, useState} from "react";
import {ChatContext} from "@/app/ChatContext";
import {useTranslations} from "@/app/languages/useTranslations";

export const ChatDropdownMenu = () => {
    const [ok, setOk] = useState(false)
    useEffect(() => {
        setOk(true)
    }, []);

    const translations = useTranslations();
    const {setData, setMessages} = useContext(ChatContext)!;

    return ok && <>
        <Drawer>
            {/*<DropdownMenu>*/}
            {/*    <DropdownMenuTrigger asChild>*/}
            {/*        <Button variant="ghost" size="icon">*/}
            {/*            <EllipsisVertical/>*/}
            {/*        </Button>*/}
            {/*    </DropdownMenuTrigger>*/}
            {/*    <DropdownMenuContent>*/}
            {/*        <DrawerTrigger asChild>*/}
            {/*            <DropdownMenuItem>*/}
            {/*                <RotateCcw/>*/}
            {/*                {translations.reset.restart}*/}
            {/*            </DropdownMenuItem>*/}
            {/*        </DrawerTrigger>*/}
            {/*    </DropdownMenuContent>*/}
            {/*</DropdownMenu>*/}
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <Plus/>
                    <div className="hidden xs:block">
                        {translations.reset.newChat}
                    </div>
                </Button>
            </DrawerTrigger>
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
                                    sessionStorage.setItem("ai-messages", "[]")
                                }}>{translations.reset.reset}</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}