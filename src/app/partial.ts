import {parsePartialJson} from "@ai-sdk/ui-utils";

export const parsePartial = <T>(partial: string): [boolean, T] => {
    try {
        return [true, JSON.parse(partial)];
    } catch {
        return [false, parsePartialJson(partial).value! as T]
    }
}