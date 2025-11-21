import {description} from "../../../config";

export const German = {
    cancel: "Abbrechen",
    close: "Schließen",
    reset: {
        restart: "Neu anfangen",
        reset: "Zurücksetzen",
        description: "Willst du den Chatverlauf wirklich zurücksetzen?",
        newChat: "Neuer Chat"
    },
    input: {
        warning: "KI macht Fehler. Überprüfe wichtige Informationen. Gib keine persönlichen Daten an.",
        placeholder: "👋 Wie kann ich dir behilflich sein?",
        send: "Senden"
    },
    welcome: {
        h1: `Hallo, Ich bin {assistantName}!`,
        subtitle: description,
        help: "Ich helfe dir gerne bei Fragen zu:",
        help2: "Stell mir einfach deine Frage!"
    },
    promptSuggestions: {
        nonGerman: {
            prompt: "Möglichkeiten für Nicht-Deutschsprachige?",
            text: "Gibt es Möglichkeiten für Nicht-Deutschsprachige?"
        },
        general: {
            prompt: "Erzähle mir mehr über das {schoolName}",
            text: "Generelle Informationen"
        },
        apology: {
            prompt: "Ich bin krank und kann morgen nicht in die Schule kommen. Was müssen meine Eltern tun?",
            text: "Entschuldigungspraxis"
        },
        timetable: {
            prompt: "Wie sieht ein typischer Stundenplan aus?",
            text: "Typischer Stundenplan"
        },
        events: {
            prompt: "Welche Veranstaltungen finden demnächst statt?",
            text: "Veranstaltungen"
        },
        news: {
            prompt: "Was gibt's neues?",
            text: "Neuigkeiten"
        },
        signup: {
            prompt: "Wie melde ich mein Kind an?",
            text: "Kind Anmelden"
        }
    },
    entityTable: {
        startDate: "Wann?",
        place: "Wo?",
        phone: "Telefon:",
        email: "E-Mail:",
        fax: "Fax:",
        price: "Eintritt:",
        targetGroup: "Für Wen?",
    },
    footer: {
        madeBy: "Entwickelt von",
        source: "Quellcode",
        privacyPolicy: "Datenschutz",
        feedback: "Feedback"
    },
    feedback: {
        title: `Feedback für {assistantName}`,
        description: `Wie war deine Erfahrung mit {assistantName}?`,
        rating: "Bewertung",
        message: "Deine Nachricht",
        characterLimit: "Zeichen",
        name: "Dein Name",

        messagePlaceholder: `Erzähl uns von deiner Erfahrung mit {assistantName}...`,
        namePlaceholder: "z.B. Max Mustermann",

        optional: "Optional",

        sending: "Wird gesendet",
        send: "Feedback senden",

        errors: {
            message: "Bitte schreib eine Nachricht",
            rating: "Bitte gib eine Bewertung ab",
            network: "Fehler beim Senden",
            unknown: "Ein Fehler ist aufgetreten"
        },
        thanks: {
            title: "Vielen Dank!",
            message: "Dein Feedback hilft mir dabei, ein besserer Assistent für das {schoolName} zu werden!"
        }
    }
}