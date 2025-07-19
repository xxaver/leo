import {createContext, RefObject} from "react";
import {UseChatHelpers} from "@ai-sdk/react";

export const ChatContext = createContext<(UseChatHelpers & {inputRef: RefObject<HTMLInputElement | null>}) | null>(null)