import {scrapeOther} from "./other";
import {target} from "./config";

export const scrape = async () => {
    // await scrapeNews(target);
    await scrapeOther(target);
};
scrape();