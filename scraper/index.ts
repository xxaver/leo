import {scrapeOther} from "./other";
import {target} from "./config";
import { scrapeNews } from "./news";

export const scrape = async () => {
    await scrapeNews(target);
    await scrapeOther(target);
};
scrape();