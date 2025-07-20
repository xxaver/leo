import {Chat} from "@/app/Chat";
import {generateSystemPrompt} from "@/data/systemPrompt";

export default function Home() {
    console.log(generateSystemPrompt())
    return <Chat/>
}
