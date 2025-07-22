import {parsePartialJson} from "@ai-sdk/ui-utils";

export const parsePartial = <T>(partial: string): [boolean, T] => {
    if(partial.startsWith("```json")) partial = partial.slice(7, -3);
    try {
        return [true, JSON.parse(partial)];
    } catch {
        return [false, parsePartialJson(partial).value! as T]
    }
}