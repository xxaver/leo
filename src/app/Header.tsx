"use client";

import {FC, PropsWithChildren, ReactNode} from "react";
import {ChatMessageLogo} from "@/app/ChatMessage";
import Link from "next/link";
import {usePathname} from "next/navigation";

export const Header: FC<PropsWithChildren & {
    items?: ReactNode
}> = ({children, items}) => {
    const pathName = usePathname();
    const Element = pathName === "/" ? "div" : Link;
    
    return <div className="flex flex-col fixed inset-0 overflow-hidden min-w-0 @container/chat">
        <div className="border-b p-3 font-medium text-2xl flex items-center gap-2">
            <Element href="/" className="flex grow items-center gap-2 !no-underline !text-foreground">
                <ChatMessageLogo role="assistant"/>
                <h1>{process.env.NEXT_PUBLIC_ASSISTANT_NAME}</h1>
            </Element>
            {items}
        </div>
        {children}
    </div>
}