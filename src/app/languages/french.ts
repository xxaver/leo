import {German} from "@/app/languages/german";

export const French: typeof German = {
    cancel: "Annuler",
    close: "Fermer",
    reset: {
        restart: "Recommencer",
        reset: "Réinitialiser",
        description: "Voulez‑vous vraiment réinitialiser l’historique du chat ?",
        newChat: "Nouveau chat"
    },
    input: {
        warning: "L’IA peut faire des erreurs. Vérifiez les informations importantes.",
        placeholder: "👋 Comment puis‑je vous aider ?",
        send: "Envoyer"
    },
    welcome: {
        h1: `Bonjour, je suis ${process.env.NEXT_PUBLIC_ASSISTANT_NAME} ! 🦁`,
        subtitle: "Je suis l’assistant IA du Gymnasium Weingarten, développé pendant les journées de projet 2025 pour le 50ᵉ anniversaire du gymnase.",
        help: "Je peux vous aider pour :",
        help2: "Posez-moi simplement votre question !"
    },
    promptSuggestions: {
        nonGerman: {
            prompt: "Existe-t-il des opportunités pour les non-germanophones ?",
            text: "Opportunités pour non-germanophones"
        },
        general: {
            prompt: "Parlez‑moi davantage du Gymnasium Weingarten",
            text: "Informations générales"
        },
        apology: {
            prompt: "Je suis malade et je ne peux pas aller à l’école demain. Que doivent faire mes parents ?",
            text: "Procédure d’excuse"
        },
        timetable: {
            prompt: "À quoi ressemble un emploi du temps typique ?",
            text: "Emploi du temps type"
        },
        events: {
            prompt: "Quels événements auront lieu prochainement ?",
            text: "Événements"
        },
        news: {
            prompt: "Quoi de neuf ?",
            text: "Actualités"
        },
        signup: {
            prompt: "Comment inscrire mon enfant ?",
            text: "Inscription d’un enfant"
        }
    },
    entityTable: {
        startDate: "Quand ?",
        place: "Où ?",
        phone: "Téléphone :",
        email: "E‑mail :",
        fax: "Fax :",
        price: "Entrée :",
        targetGroup: "Pour qui ?"
    },
    footer: {
        madeBy: "Développé par",
        source: "Code source",
        privacyPolicy: "Confidentialité",
        feedback: "Retour"
    },
    feedback: {
        title: "Retour pour Leo",
        description: "Comment était votre expérience avec Leo ?",
        rating: "Évaluation",
        message: "Votre message",
        characters: "Caractères",
        name: "Votre nom",
        messagePlaceholder: "Parlez‑nous de votre expérience avec Leo…",
        namePlaceholder: "p. ex. Max Mustermann",
        optional: "Facultatif",
        sending: "En cours d’envoi",
        send: "Envoyer le retour",
        errors: {
            message: "Veuillez écrire un message",
            rating: "Veuillez donner une note",
            network: "Erreur lors de l’envoi",
            unknown: "Une erreur est survenue"
        },
        thanks: {
            title: "Un grand merci !",
            message: "Vos retours m’aident à devenir un meilleur assistant pour le Gymnasium Weingarten !"
        }
    }
}
