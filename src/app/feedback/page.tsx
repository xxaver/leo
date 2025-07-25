import {Header} from "@/app/Header";
import {FeedbackForm} from "@/app/feedback/FeedbackForm";
import {LanguagePicker} from "@/LanguagePicker";

export default function Feedback() {
    return <Header items={<LanguagePicker />}>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3">
            <div className="w-full max-w-md">
                <FeedbackForm />
            </div>
        </div>
    </Header>
}