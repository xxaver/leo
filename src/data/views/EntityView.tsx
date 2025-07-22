import {FC, Fragment, useEffect, useState} from "react";
import {Entity} from "@/data/types/entityBase";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowUpRight, Calendar, Euro, Mail, MapPin, Phone, Printer, User} from "lucide-react";
import {useTranslations} from "@/app/languages/useTranslations";

const options: Intl.DateTimeFormatOptions = {dateStyle: "long", timeStyle: "short", timeZone: "Europe/Berlin"};
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     weekday: "long",
//     minute: "numeric",
//     hour: "numeric",
//     dateStyle: "short"
// }

const table = {
    startDate: <Calendar/>,
    place: <MapPin/>,
    phone: <Phone/>,
    email: <Mail/>,
    fax: <Printer/>,
    targetGroup: <User/>,
    price: <Euro/>,
}
const format = {
    price: (e: Entity) => typeof e.price === "number" ? `${e.price} €` : e.price,
    place: (e: Entity) => [e.place, ...(e.dates?.map(e => e.place) || [])].filter(Boolean).join(", "),
    startDate: (e: Entity) => {
        const format = (e) => (typeof e.startDate === "number" ? new Date(e.startDate).toLocaleString("de-DE", options) : e.startDate)
            + " bis "
            + (typeof e.endDate === "number" ? new Date(e.endDate).toLocaleString("de-DE", options) : e.endDate)

        return [
            (e.startDate || e.endDate) && format(e),
            ...(e.dates?.map(format) || [])
        ].filter(Boolean).join(", ");
    },
}
const captions = {
    contact: "Ansprechpartner",
    eventDate: "Termine",
    event: "Veranstaltung",
    form: "Formulare",
    ag: "AGs",
    news: "Neuigkeiten",
}

export const EntityView: FC<{
    entity: Entity;
    listener?: () => void;
    size?: "medium" | "small" | "large"
}> = ({entity: entity_, listener, size: size_}) => {
    const [size, setSize] = useState<"medium" | "small" | "large">(size_ || "medium");
    const [stack, setStack] = useState([entity_]);
    useEffect(() => {
        setStack([entity_])
    }, [entity_]);
    const entity = stack.at(-1)!;
    const translations = useTranslations()

    const inTable = Object.keys(table).map((e) => (format[e] ? format[e](entity) : entity[e]) &&
        <tr key={e} className="border-transparent border-b-5">
            <td className="flex items-center gap-1.5 text-muted-foreground mr-2">{table[e]}{translations.entityTable[e]}</td>
            <td>{format[e] ? format[e](entity) : entity[e]}</td>
        </tr>).filter(Boolean);
    const Element = entity.element;


    const related_ = !listener && Object.keys(captions).map(c => {
        console.log(c)
        const items = (entity.related || []).filter(e => e.type === c).map(e =>
            <EntityView entity={e} key={e.id}
                        size="small"
                        listener={() => setStack(stack => {
                            if (stack.includes(e)) return stack.slice(0, stack.indexOf(e) + 1)
                            return [...stack, e]
                        })}/>);
        if (!items.length) return null;
        return <Fragment key={c}>
            <div className="text-muted-foreground text-sm">{captions[c]}</div>
            <div className="flex mt-1 gap-3 flex-wrap">{items}</div>
        </Fragment>
    }).filter(Boolean)
    const related = related_.length ? related_ : null;

    return <div
        className={`bg-background border p-4 rounded-sm ${listener ? "cursor-pointer hover:border-muted-foreground transition" : "border-red-300 grow @container"} ${size === "small" ? "text-sm" : ""}`}
        onClick={listener}>
        {/*return <div className="bg-[var(--decent)] p-4 rounded-sm grow">*/}
        <div className="flex items-baseline gap-2">
            {stack.length > 1 && <Button variant="ghost" size="icon" className="cursor-pointer"
                                         onClick={() => setStack(stack => stack.length > 1 ? stack.slice(0, -1) : stack)}>
                <ArrowLeft/>
            </Button>}
            <div className="text-lg grow font-medium">{entity.name || entity.parent?.name}</div>
            {(entity.link || entity.parent?.link) && <Button asChild variant="ghost" size="icon">
                <a href={(entity.link || entity.parent?.link)} target="_blank" className="!text-foreground"
                   onClick={e => e.stopPropagation()}>
                    <ArrowUpRight/>
                </a>
            </Button>}
        </div>
        {entity.type === "form" && size !== "small" && <div className="mt-3"><Element/></div>}
        <div className="flex @sm:items-start gap-5 @sm:flex-row flex-col items-center">
            {size !== "small" && (entity.image || entity.parent?.image) &&
                <img src={entity.image || entity.parent?.image} alt=""
                     className="w-48 @sm:w-24 @md:w-48 rounded-md mt-3"/>
            }
            <div>
                {(entity.description || entity.parent?.description) && !(listener && entity.type === "eventDate") &&
                    <div className={"mt-3 " + (size === "small"
                        ? "not-hover:line-clamp-1"
                        : size === "medium"
                            ? "not-hover:line-clamp-[4]"
                            : "not-hover:line-clamp-[10]")}>
                        {entity.description || entity.parent?.description}
                    </div>}
                {inTable.length > 0 && !(listener && entity.type !== "eventDate") && <table className="mt-3">
                    <tbody>
                    {inTable}
                    </tbody>
                </table>}
                {related && <div className="hidden @md:block mt-3">{related}</div>}
            </div>
        </div>
        {related && <div className="@md:hidden mt-3">{related}</div>}
        {
            size === "small" && !listener && <div className="flex mt-3">
                <div className="grow"/>
                <Button onClick={() => setSize("large")} className="cursor-pointer">
                    Mehr anzeigen
                </Button>
            </div>
        }
    </div>
}
