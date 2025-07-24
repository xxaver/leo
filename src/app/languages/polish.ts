import {German} from "@/app/languages/german";

export const Polish: typeof German = {
    cancel: "Anuluj",
    close: "Zamknij",
    reset: {
        restart: "Zacznij od nowa",
        reset: "Zresetuj",
        description: "Czy na pewno chcesz zresetować historię czatu?",
        newChat: "Nowy czat"
    },
    input: {
        warning: "SI może popełniać błędy. Sprawdź ważne informacje.",
        placeholder: "👋 W czym mogę pomóc?",
        send: "Wyślij"
    },
    welcome: {
        h1: `Cześć, jestem ${process.env.NEXT_PUBLIC_ASSISTANT_NAME}! 🦁`,
        subtitle: "Jestem asystentem czatowym Gymnasium Weingarten, stworzonym podczas dni projektu 2025 na 50‑lecie gimnazjum.",
        help: "Chętnie pomogę Ci w sprawach:",
        help2: "Po prostu zadaj pytanie!"
    },
    promptSuggestions: {
        nonGerman: {
            prompt: "Czy są możliwości dla osób nieznających niemieckiego?",
            text: "Możliwości dla osób nieznających niemieckiego"
        },
        general: {
            prompt: "Opowiedz mi więcej o Gymnasium Weingarten",
            text: "Informacje ogólne"
        },
        apology: {
            prompt: "Jestem chory i nie mogę jutro przyjść do szkoły. Co muszą zrobić moi rodzice?",
            text: "Procedura usprawiedliwienia"
        },
        timetable: {
            prompt: "Jak wygląda typowy plan lekcji?",
            text: "Typowy plan lekcji"
        },
        events: {
            prompt: "Jakie wydarzenia odbędą się wkrótce?",
            text: "Wydarzenia"
        },
        news: {
            prompt: "Co nowego?",
            text: "Nowości"
        },
        signup: {
            prompt: "Jak zapisać moje dziecko?",
            text: "Zapis dziecka"
        }
    },
    entityTable: {
        startDate: "Kiedy?",
        place: "Gdzie?",
        phone: "Telefon:",
        email: "E‑mail:",
        fax: "Faks:",
        price: "Wstęp:",
        targetGroup: "Dla kogo?"
    },
    footer: {
        madeBy: "Stworzone przez",
        source: "Kod źródłowy",
        privacyPolicy: "Polityka prywatności",
        feedback: "Opinie"
    },
    feedback: {
        title: "Opinia dla Leo",
        description: "Jakie były Twoje wrażenia z korzystania z Leo?",
        rating: "Ocena",
        message: "Twoja wiadomość",
        characters: "Znaki",
        name: "Twoje imię",
        messagePlaceholder: "Opowiedz nam o swoim doświadczeniu z Leo…",
        namePlaceholder: "np. Max Mustermann",
        optional: "Opcjonalne",
        sending: "Wysyłanie",
        send: "Wyślij opinię",
        errors: {
            message: "Proszę napisać wiadomość",
            rating: "Proszę podać ocenę",
            network: "Błąd wysyłania",
            unknown: "Wystąpił błąd"
        },
        thanks: {
            title: "Bardzo dziękuję!",
            message: "Twoja opinia pomaga mi być lepszym asystentem dla Gymnasium Weingarten!"
        }
    }
}
