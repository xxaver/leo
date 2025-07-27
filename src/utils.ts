export const merge = (p: any, c: any, modifier = (a: string) => a) => {
    const newObj = {...p};
    for (const key in c) {
        if (p[key] === undefined) newObj[key] = c[key];
        else if (typeof p[key] === "object") newObj[key] = merge(p[key], c[key], modifier);
    }
    for (const key in newObj) {
        if(typeof newObj[key] === "string") newObj[key] = modifier(newObj[key])
    }
    return newObj;
}