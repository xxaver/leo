export const merge = (p: any, c: any) => {
    const newObj = {...p};
    for (const key in c) {
        if (p[key] === undefined) newObj[key] = c[key];
        else if (typeof p[key] === "object") newObj[key] = merge(p[key], c[key]);
    }
    return newObj;
}