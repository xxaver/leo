import {Header} from "@/app/Header";
import Markdown from "react-markdown";
import privacy from "@/app/privacy/privacy.md";

export default function Privacy() {
    return <Header>
        <div className="self-stretch feedback p-6 min-h-0 overflow-auto">
            <div className="mx-auto max-w-4xl">
                <Markdown>
                    {privacy}
                </Markdown>
            </div>
        </div>
    </Header>
}