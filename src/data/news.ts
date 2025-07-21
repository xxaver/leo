import {News} from "@/data/types/news";
import actualNews from "@/data/news.json";

export const news = Object.values(actualNews).filter(Boolean) as News[];