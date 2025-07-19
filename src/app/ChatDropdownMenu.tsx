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

export const ChatDropdownMenu = () => {
    const {setData, setMessages} = useContext(ChatContext)!;
    return <Drawer>
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
                        Neu anfangen
                    </DropdownMenuItem>
                </DrawerTrigger>
            </DropdownMenuContent>
        </DropdownMenu>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Zurücksetzen</DrawerTitle>
                <DrawerDescription>Willst du den Chatverlauf wirklich zurücksetzen?</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
                <DrawerClose asChild>
                    <Button variant="outline">Abbrechen</Button>
                </DrawerClose>
                <DrawerClose asChild>
                    <Button variant="destructive"
                            onClick={() => {
                                setData([]);
                                setMessages([]);
                            }}>Zurücksetzen</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
}