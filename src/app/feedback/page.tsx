import {Header} from "@/app/Header";
import {FeedbackForm} from "@/app/feedback/FeedbackForm";
import {LanguagePicker} from "@/LanguagePicker";

export default function Feedback() {
    return <Header items={<LanguagePicker />}>
        <div className="min-h-0 grow overflow-auto bg-gray-100 flex justify-center p-3">
            <div className="w-full max-w-md">
                <FeedbackForm />
            </div>
        </div>
    </Header>
}