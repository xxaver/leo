import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export async function POST(req) {
    try {
        const { rating, message, name } = await req.json()

        if (!rating || rating < 1 || rating > 5) {
            return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
        }

        if (!message || message.trim().length === 0) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 })
        }

        const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
        const result = await supabase.from('feedback').insert([{
            name,
            message,
            rating
        }]);
        console.log(result)

        return NextResponse.json({
            success: !result.error,
            message: "Vielen Dank für dein Feedback! 🦁",
        })
    } catch (error) {
        console.error("Feedback submission error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
    
}