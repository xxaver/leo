import {ollama} from "ollama-ai-provider";
import {embed, embedMany} from "ai";
import {createClient} from "@supabase/supabase-js";
import {readFile} from "node:fs/promises";

import {target} from "../../../../scraper/config";
const model = ollama.embedding("mxbai-embed-large")

const generateChunks = (input: string): string[] => {
    return input
        .trim()
        .split('.')
        .filter(i => i !== '');
};

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

export const generateEmbeddings = async (
    value: string[],
    additional: { content: string }[] = [],
): Promise<Array<{ embedding: number[]; content: string }>> => {
    const chunks = value//generateChunks(value);
    const {embeddings} = await embedMany({
        model,
        values: [...chunks, ...additional.map(a => a.content)],
    });
    return embeddings.map((e, i) => i < chunks.length ? ({
        content: chunks[i],
        embedding: e
    }) : ({...additional[i - chunks.length], embedding: e}));
};

export const generateEmbeddingsForResources = async () => {
    const resources = (await supabase.from("resources").select("*").eq("processed", false)).data!;
    await supabase.from("embeddings").delete().in("resources", resources.map(r => r.id));
    console.log("Deleted embeddings for ", resources.length, " resources.")
    await supabase.from("embeddings").insert(
        (await Promise.all(resources.map(
                async r => {
                    const embeddings = await generateEmbeddings(r.content);
                    return embeddings.map(e => ({
                        resource: r.id,
                        ...e
                    }))
                })
            )
        ).flat())
    console.log("Generated embeddings for ", resources.length, " resources.")
    await supabase.from("resources").upsert(resources.map(r => ({
        id: r.id,
        processed: true,
    })))

}

export const generateNewResources = async () => {
    console.log(await supabase.from("resources").delete().gte("id", 0));
    const scraped = await readFile(`${target}/other.json`, "utf-8").then(JSON.parse);
    const resources = []//(await supabase.from("resources").select("url")).data!;
    await Promise.all(Object.keys(scraped).filter(k => scraped[k]?.content && !resources.some(e => e.url === k)).map(async k => {
        const {id} = (await supabase.from("resources").upsert({
            url: k,
            content: scraped[k].content,
            processed: false,
        }).select().single()).data!;
        console.log(await supabase.from("embeddings").delete().eq("resource", id));

        const embeddings = await generateEmbeddings(scraped[k].content, [
            ...scraped[k].images.map(e => ({
                type: "image",
                content: e.description ? `${e.src} ${e.description}` : e.src,
                url: e.src
            })),
            ...scraped[k].documents.map(e => ({
                type: "document",
                content: e.description ? `${e.src} ${e.description}` : e.src,
                url: e.src
            })),
        ]);
        console.log(embeddings)
        const res = await supabase.from("embeddings").upsert(embeddings.map(e => ({...e, resource: id})))
        if (res.error) console.error(res.error)
    }))
}
const test = async () => {
    const {embedding} = await embed({model, value: "aufführung"});
    console.log(embedding)
    const {data} = await supabase.rpc("search_embeddings", {
        query_embedding: embedding,
        match_threshold: .5, // choose an appropriate threshold for your data  match_count: 10, // choose the number of matches
        match_count: 4, // choose the number of matches
    })
    // console.log(data)
    console.log(data!.map(e => ({content: e.content, resource: e.resource})))
}
test();
// generateNewResources();