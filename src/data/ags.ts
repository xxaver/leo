import {Ag} from "@/data/types/ag";

export const robotics: Ag = {
    id: "robotics-ag",
    type: "ag",
    name: "Robotics-AG",
    description: 'Hier werden "Rettungs"-Roboter gebaut und programmiert. Mit diesen Robotern nehmen wir jedes Jahr am internationalen Wettbewerb RoboCup Junior teil.',
    targetGroup: "Jeder ab der 5. Klasse, ob mit Vorkenntnissen oder ohne",
    dates: [{
        place: "Informatik-Raum 1",
        startDate: "Freitag, 13:30 Uhr",
        endDate: "Freitag, 15:30 Uhr",
    }],
    link: "https://robotics.gymnasium-weingarten.de/"
}
export const ags = [robotics]