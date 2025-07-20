import {FC, Fragment, useEffect, useState} from "react";
import {Entity} from "@/data/types/entityBase";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowUpRight, Calendar, Euro, MapPin, User} from "lucide-react";

const options: Intl.DateTimeFormatOptions = {dateStyle: "long", timeStyle: "short"}
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     weekday: "long",
//     minute: "numeric",
//     hour: "numeric",
//     dateStyle: "short"
// }

const table = {
    startDate: <><Calendar/> Wann?</>,
    place: <><MapPin/> Wo?</>,
    targetGroup: <><User/>Für wen:</>,
    price: <><Euro/> Eintritt:</>,
}
const format = {
    price: (e: Entity) => typeof e.price === "number" ? `${e.price} €` : e.price,
    startDate: (e: Entity) => {
        return (typeof e.startDate === "number" ? new Date(e.startDate).toLocaleString("de-DE", options) : e.startDate)
            + " bis "
            + (typeof e.endDate === "number" ? new Date(e.endDate).toLocaleString("de-DE", options) : e.endDate)
    },
}

export const EntityView: FC<{ entity: Entity; listener?: () => void; size?: "medium" | "small" | "large" }> = ({entity: entity_, listener}) => {
    console.log(entity_)
    const [stack, setStack] = useState([entity_]);
    useEffect(() => {
        setStack([entity_])
    }, [entity_]);
    const entity = stack.at(-1)!;

    const inTable = Object.keys(table).map((e) => entity[e] && <tr key={e} className="border-transparent border-b-5">
        <td className="flex items-center gap-1.5 text-muted-foreground mr-2">{table[e]}</td>
        <td>{format[e] ? format[e](entity) : entity[e]}</td>
    </tr>).filter(Boolean);

    const related = entity.related?.map((e, i) => <EntityView entity={e} key={e.id}
                                                              listener={() => setStack(stack => [...stack, e])}/>)

    return <div
        className={`bg-background border p-4 rounded-sm grow ${listener ? "cursor-pointer hover:border-muted-foreground transition" : "border-red-300"}`}
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
        <div className="mt-4 flex items-start gap-5">
            {!listener && (entity.image || entity.parent?.image) &&
                <img src={entity.image || entity.parent?.image} alt=""
                     className="w-24 md:w-48 rounded-md"/>
            }
            <div>
                {(!listener || !inTable.length) && (entity.description || entity.parent?.description) &&
                    <div className={listener ? "line-clamp-[4]" : "line-clamp-[10]"}>
                        {entity.description || entity.parent?.description}
                    </div>}
                {inTable.length > 0 && <table className="mt-3">
                    <tbody>
                    {inTable}
                    </tbody>
                </table>}
                {related?.length > 0 && <div className="hidden md:flex mt-4 gap-3">{related}</div>}
            </div>
        </div>
        {related?.length > 0 && <div className="md:hidden mt-4 gap-3">{related}</div>}
    </div>
}
