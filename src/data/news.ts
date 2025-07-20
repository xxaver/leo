import {News} from "@/data/types/news";
import actualNews from "@/data/news.json";

export const lesescouts_17_7_25: News = {
    image: "https://www.gymnasium-weingarten.de/fileadmin/user_upload/IMG_2928.jpg",
    link: "https://www.gymnasium-weingarten.de/aktuelles/news?tx_news_pi1%5Baction%5D=detail&tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Bnews%5D=588&cHash=336c0feeada776307babd52eb87de7e9",
    type: "news",
    id: "lesescouts_17_7_25",
    name: "Besuch in der Buchhandlung – Lesestoff für die Ferien",
    description: `Rechtzeitig vor dem Start in die Sommerferien durften die Lesescouts Bücher für die Schülerbücherei aussuchen. Beim Besuch der Buchhandlung Ravensbuch wurde nicht nur ausgiebig gestöbert und in neue Geschichten hineingelesen, sondern es landeten auch einige spannende Neuzugänge im Einkaufskorb. Mit dabei sind, unter vielen anderen packenden Büchern, Sunrise on the Reaping, ein echtes Highlight für alle Tribute von Panem- Fans, und Anymore von der Bestsellerautorin Sarah Sprinz. Wer Internatsgeschichten liebt und die ersten drei Bände der Dunbridge Academy – Reihe gelesen hat, freut sich sicherlich über den neuesten Band. Aber nicht nur für die Schüler und Schülerinnen der Mittelstufe, auch für die jüngeren Leser: innen wählten die Lesescouts spannende Titel aus, um für fesselnde und aufregende Lesestunden zu sorgen. Lasst euch überraschen!
    Wer sich also noch mit Lesestoff für die Ferien eindecken möchte, sollte unbedingt in der Schülerbücherei vorbeischauen. Die Auswahl an neuen Büchern ist groß, eure Ferien sind gerettet!
    Vielen Dank auch an Frau Rapp für ihr Vertrauen in die Lesescouts.`
}
export const news = Object.values(actualNews).filter(Boolean) as News[];