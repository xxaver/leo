import {EntityBase} from "@/data/types/entityBase";
import {z, ZodTypeAny} from "zod";

export const createLiterals = (ids: (string | EntityBase)[]) => {
    return z.union(ids.map(id => z.literal(id)))
    let literal: ZodTypeAny = z.literal(typeof ids[0] === "string" ? ids[0] : ids[0].id)
    for (let i = 1; i < ids.length; i++) {
        const e = ids[i]
        literal = literal.or(z.literal(typeof e === "string" ? e : e.id))
    }
    return literal
}