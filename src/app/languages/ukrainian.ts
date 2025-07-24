import {German} from "@/app/languages/german";

export const Ukrainian: typeof German = {
    cancel: "Скасувати",
    close: "Закрити",
    reset: {
        restart: "Почати спочатку",
        reset: "Скинути",
        description: "Ви справді хочете скинути історію чату?",
        newChat: "Новий чат"
    },
    input: {
        warning: "ШІ може помилятися. Перевірте важливу інформацію.",
        placeholder: "👋 Чим я можу допомогти?",
        send: "Надіслати"
    },
    welcome: {
        h1: `Привіт, я ${process.env.NEXT_PUBLIC_ASSISTANT_NAME}! 🦁`,
        subtitle: "Я чат‑асистент Gymnasium Weingarten, створений під час проєктних днів 2025 до 50‑річчя гімназії.",
        help: "Я із задоволенням допоможу вам з:",
        help2: "Просто задайте мені ваше питання!"
    },
    promptSuggestions: {
        nonGerman: {
            prompt: "Чи є можливості для тих, хто не говорить німецькою?",
            text: "Можливості для не-німецькомовних"
        },
        general: {
            prompt: "Розкажи мені більше про Gymnasium Weingarten",
            text: "Загальна інформація"
        },
        apology: {
            prompt: "Я хворий і не зможу прийти до школи завтра. Що мають зробити мої батьки?",
            text: "Процедура вибачення"
        },
        timetable: {
            prompt: "Як виглядає типовий розклад уроків?",
            text: "Типовий розклад"
        },
        events: {
            prompt: "Які події відбудуться найближчим часом?",
            text: "Події"
        },
        news: {
            prompt: "Що нового?",
            text: "Новини"
        },
        signup: {
            prompt: "Як зареєструвати мою дитину?",
            text: "Реєстрація дитини"
        }
    },
    entityTable: {
        startDate: "Коли?",
        place: "Де?",
        phone: "Телефон:",
        email: "Е‑пошта:",
        fax: "Факс:",
        price: "Вхід:",
        targetGroup: "Для кого?"
    },
    footer: {
        madeBy: "Розроблено",
        source: "Вихідний код",
        privacyPolicy: "Конфіденційність",
        feedback: "Відгук"
    },
    feedback: {
        title: "Відгук для Leo",
        description: "Який у вас був досвід спілкування з Leo?",
        rating: "Оцінка",
        message: "Ваше повідомлення",
        characters: "Символи",
        name: "Ваше ім’я",
        messagePlaceholder: "Розкажіть про свій досвід з Leo…",
        namePlaceholder: "напр. Max Mustermann",
        optional: "Необов’язково",
        sending: "Надсилається",
        send: "Надіслати відгук",
        errors: {
            message: "Будь ласка, напишіть повідомлення",
            rating: "Будь ласка, поставте оцінку",
            network: "Помилка при надсиланні",
            unknown: "Сталася невідома помилка"
        },
        thanks: {
            title: "Щиро дякую!",
            message: "Ваш відгук допомагає мені стати кращим асистентом для Gymnasium Weingarten!"
        }
    }
}
