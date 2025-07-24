import {German} from "@/app/languages/german";

export const English: typeof German = {
    cancel: "Cancel",
    reset: {
        restart: "Start Over",
        reset: "Reset",
        description: "Do you really want to reset the chat history?",
        newChat: "New Chat"
    },
    input: {
        warning: "AI is making mistakes. Please check important information.",
        placeholder: "👋 How can I help you?",
        send: "Send"
    },
    welcome: {
        h1: `Hi there! I’m ${process.env.NEXT_PUBLIC_ASSISTANT_NAME} 🦁`,
        subtitle: "I'm a chat assistant of Gymnasium Weingarten, developed during the 2025 project days for the school's 50th anniversary.",
        help: "I can help with questions about:",
        help2: "Feel free to ask me your question!"
    },
    promptSuggestions: {
        general: {
            prompt: "Tell me more about the Gymnasium Weingarten",
            text: "General Information"
        },
        apology: {
            prompt: "I'm sick and can't come to school tomorrow. What must my parents do?",
            text: "Apology Policy"
        },
        timetable: {
            prompt: "What's a typical timetable like?",
            text: "Typical Timetable"
        },
        events: {
            prompt: "What events are coming up next?",
            text: "Events"
        },
        news: {
            prompt: "What's on the news?",
            text: "News"
        },
        signup: {
            prompt: "How can I register my child?",
            text: "Register Child"
        }
    },
    entityTable: {
        startDate: "When?",
        place: "Where?",
        phone: "Phone:",
        email: "Mail:",
        fax: "Fax:",
        price: "Admission:",
        targetGroup: "For whom?",
    },
    footer: {
        madeBy: "Made by",
        source: "Source Code",
        privacyPolicy: "Privacy Policy",
        feedback: "Feedback"
    },
    feedback: {
        title: "Feedback for Leo",
        description: "How was your experience with Leo?",
        rating: "Rating",
        message: "Your Message",
        characters: "Characters",
        name: "Your Name",

        messagePlaceholder: "Tell us about your experience with Leo...",
        namePlaceholder: "e.g. Max Mustermann",

        optional: "Optional",

        sending: "Sending",
        send: "Send Feedback",

        errors: {
            message: "Please write a message",
            rating: "Please give a rating",
            network: "Error while sending",
            unknown: "An error occurred"
        },
        thanks: {
            title: "Thank you!",
            message: "Your feedback helps me become a better assistant for Gymnasium Weingarten!"
        }
    },
    close: "Close"
}