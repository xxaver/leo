import {German} from "@/app/languages/german";

export const Turkish: typeof German = {
    cancel: "İptal",
    close: "Kapat",
    reset: {
        restart: "Yeniden başla",
        reset: "Sıfırla",
        description: "Sohbet geçmişini gerçekten sıfırlamak istiyor musun?",
        newChat: "Yeni sohbet"
    },
    input: {
        warning: "Yapay zeka hata yapabilir. Önemli bilgileri kontrol et.",
        placeholder: "👋 Size nasıl yardımcı olabilirim?",
        send: "Gönder"
    },
    welcome: {
        h1: `Merhaba, ben ${process.env.NEXT_PUBLIC_ASSISTANT_NAME}! 🦁`,
        subtitle: "2025 proje günlerinde Gymnasium Weingarten’in 50. yılı için geliştirilen okulun sohbet asistanıyım.",
        help: "Aşağıdakiler konusunda sana yardımcı olabilirim:",
        help2: "Sadece sorunu sor!"
    },
    promptSuggestions: {
        nonGerman: {
            prompt: "Almanca bilmeyenler için fırsatlar var mı?",
            text: "Almanca bilmeyenler için fırsatlar"
        },
        general: {
            prompt: "Gymnasium Weingarten hakkında daha fazla anlat",
            text: "Genel bilgiler"
        },
        apology: {
            prompt: "Hastayım ve yarın okula gelemeyeceğim. Velilerimin ne yapması gerekiyor?",
            text: "Mazeret uygulaması"
        },
        timetable: {
            prompt: "Tipik bir ders programı nasıl görünüyor?",
            text: "Tipik ders programı"
        },
        events: {
            prompt: "Yakında hangi etkinlikler olacak?",
            text: "Etkinlikler"
        },
        news: {
            prompt: "Yenilikler neler?",
            text: "Haberler"
        },
        signup: {
            prompt: "Çocuğumu nasıl kaydettirebilirim?",
            text: "Çocuk kaydı"
        }
    },
    entityTable: {
        startDate: "Ne zaman?",
        place: "Nerede?",
        phone: "Telefon:",
        email: "E‑posta:",
        fax: "Faks:",
        price: "Giriş:",
        targetGroup: "Kim için?"
    },
    footer: {
        madeBy: "Tarafından geliştirildi",
        source: "Kaynak kodu",
        privacyPolicy: "Gizlilik",
        feedback: "Geri bildirim"
    },
    feedback: {
        title: "Leo için geri bildirim",
        description: "Leo ile deneyimin nasıldı?",
        rating: "Değerlendirme",
        message: "Mesajınız",
        characters: "Karakter",
        name: "Adınız",
        messagePlaceholder: "Leo ile deneyiminizi anlatın…",
        namePlaceholder: "örn. Max Mustermann",
        optional: "İsteğe bağlı",
        sending: "Gönderiliyor",
        send: "Geri bildirimi gönder",
        errors: {
            message: "Lütfen bir mesaj yazın",
            rating: "Lütfen bir değerlendirme verin",
            network: "Gönderme hatası",
            unknown: "Bir hata oluştu"
        },
        thanks: {
            title: "Teşekkürler!",
            message: "Geri bildiriminiz, Gymnasium Weingarten için daha iyi bir asistan olmama yardımcı oluyor!"
        }
    }
}
