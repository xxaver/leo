import {scrapeNews} from "./news";
import {scrapeOther} from "./other";


export const scrape = () => {
    // scrapeNews("C:\\Users\\Daniel\\WebstormProjects\\gym-wgt-ai\\src\\data\\news.json");
    scrapeOther("C:\\Users\\Daniel\\WebstormProjects\\gym-wgt-ai\\src\\data\\other.json");
};
scrape();