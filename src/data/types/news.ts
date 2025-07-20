import {EntityBase} from "@/data/types/entityBase";
import {Contact} from "@/data/types/contact";

export interface News extends EntityBase {
    type: "news",
    date?: number,
    description?: string,
    images?: string[],
}

export const renderNews = (news: News) => {
    return [
        news.date && new Date(news.date).toLocaleString("de-DE"),
        news.description,
    ]
}