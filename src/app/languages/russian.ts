import {German} from "@/app/languages/german";

export const Russian: typeof German = {
    cancel: "Отмена",
    close: "Закрыть",
    reset: {
        restart: "Начать заново",
        reset: "Сбросить",
        description: "Вы действительно хотите сбросить историю чата?",
        newChat: "Новый чат"
    },
    input: {
        warning: "ИИ может ошибаться. Проверьте важную информацию.",
        placeholder: "👋 Чем я могу вам помочь?",
        send: "Отправить"
    },
    welcome: {
        h1: `Привет, я ${process.env.NEXT_PUBLIC_ASSISTANT_NAME}! 🦁`,
        subtitle: "Я чат‑ассистент гимназии Вайнгартен, разработанный во время проектных дней 2025 к 50‑летию гимназии.",
        help: "Я с радостью помогу вам с:",
        help2: "Просто задайте ваш вопрос!"
    },
    promptSuggestions: {
        nonGerman: {
            prompt: "Есть ли возможности для тех, кто не говорит по-немецки?",
            text: "Возможности для не говорящих по-немецки"
        },
        general: {
            prompt: "Расскажите мне больше о Gymnasium Weingarten",
            text: "Общая информация"
        },
        apology: {
            prompt: "Я болен и завтра не могу прийти в школу. Что должны сделать мои родители?",
            text: "Процедура извинения"
        },
        timetable: {
            prompt: "Как выглядит типичное расписание?",
            text: "Типичное расписание"
        },
        events: {
            prompt: "Какие мероприятия скоро пройдут?",
            text: "Мероприятия"
        },
        news: {
            prompt: "Что нового?",
            text: "Новости"
        },
        signup: {
            prompt: "Как записать моего ребёнка?",
            text: "Запись ребёнка"
        }
    },
    entityTable: {
        startDate: "Когда?",
        place: "Где?",
        phone: "Телефон:",
        email: "Э‑mail:",
        fax: "Факс:",
        price: "Вход:",
        targetGroup: "Для кого?"
    },
    footer: {
        madeBy: "Разработано",
        source: "Исходный код",
        privacyPolicy: "Конфиденциальность",
        feedback: "Отзыв"
    },
    feedback: {
        title: "Отзыв о Leo",
        description: "Каков был ваш опыт с Leo?",
        rating: "Оценка",
        message: "Ваше сообщение",
        characters: "Символов",
        name: "Ваше имя",
        messagePlaceholder: "Расскажите о своём опыте с Leo…",
        namePlaceholder: "напрм. Max Mustermann",
        optional: "Необязательно",
        sending: "Отправка",
        send: "Отправить отзыв",
        errors: {
            message: "Пожалуйста, напишите сообщение",
            rating: "Пожалуйста, поставьте оценку",
            network: "Ошибка при отправке",
            unknown: "Произошла ошибка"
        },
        thanks: {
            title: "Большое спасибо!",
            message: "Ваш отзыв помогает мне стать лучшим ассистентом для гимназии Вайнгартен!"
        }
    }
}
