import {EventInfo} from "@/data/types/eventInfo";

export const theater: EventInfo = {
    type: "event",
    id: "theater2025",
    name: "Theater: Der kleine Prinz",
    link: "https://www.gymnasium-weingarten.de/aktuelles/news?tx_news_pi1%5Baction%5D=detail&tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Bnews%5D=582&cHash=bca768db28dbcd76a690f00254729c73",
    image: "https://www.gymnasium-weingarten.de/fileadmin/user_upload/1000066610.jpg",
    related: [{
        type: "eventDate",
        id: "theater2025-1",
        place: "Turnhalle 4",
        startDate: 1752861600000,
        endDate: 1752868800000,
        price: 6
    }, {
        type: "eventDate",
        id: "theater2025-2",
        place: "Turnhalle 4",
        startDate: 1752948000000,
        endDate: 1752955200000,
        price: 6
    }, {
        type: "eventDate",
        id: "theater2025-3",
        place: "Turnhalle 4",
        startDate: 1753034400000,
        endDate: 1753041600000,
        price: 6
    }],
    description: `Inspiriert von Antoine de Saint-Exupérys zeitlosem Werk, bringen wir dieses Jahr „Der Kleine Prinz“ auf die Bühne. Ursprünglich in den 1940er Jahren geschrieben, haben wir die Geschichte behutsam in unsere Gegenwart übertragen und sie mit Musik aus den 1970er Jahren verbunden – dem Gründungsjahrzehnt des Gymnasiums Weingarten. Wir laden Sie herzlich ein, mit uns auf diese Reise zu gehen! Feiern Sie mit uns 50 Jahre Gymnasium Weingarten – und lassen Sie sich von einer Geschichte verzaubern, die nach wie vor Generationen verbindet.`
}
export const events = [theater];
events.forEach(e => e.related?.forEach(r => {
    if(r.type === "eventDate") r.parent = e;
}))