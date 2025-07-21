import {scrapeOther} from "./other";
import {target} from "./config";

export const scrape = () => {
    // scrapeNews("C:\\Users\\Daniel\\WebstormProjects\\gym-wgt-ai\\src\\data\\news.json");
    scrapeOther(target);
};
scrape();