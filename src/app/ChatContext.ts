import {createContext, RefObject} from "react";
import {UseChatHelpers} from "@ai-sdk/react";

export interface ShowImage {
    url: string;
    description?: string;
}

export const ChatContext = createContext<(UseChatHelpers & {
    inputRef: RefObject<HTMLInputElement | null>;
    showImage: ShowImage | null;
    setShowImage: (image: ShowImage | null) => void
    
}) | null>(null)