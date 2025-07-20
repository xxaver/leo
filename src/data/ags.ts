import {Ag} from "@/data/types/ag";

export const robotics: Ag = {
    id: "robotics-ag",
    image: "https://robotics.gymnasium-weingarten.de/wp-content/uploads/2019/12/RoboticsAG-Final.png",
    type: "ag",
    name: "Robotics-AG",
    description: 'Hier werden kleine Roboter gebaut und programmiert. Mit diesen Robotern nehmen wir jedes Jahr am internationalen Wettbewerb RoboCup Junior teil. Die Aufgabe der Roboter ist es, einen Parkour zu bewältigen und Kugeln zu sortieren.',
    targetGroup: "Jeder ab der 5. Klasse, ob mit Vorkenntnissen oder ohne",
    dates: [{
        place: "Informatik-Raum 1",
        startDate: "Freitag, 13:30 Uhr",
        endDate: "Freitag, 15:30 Uhr",
    }],
    link: "https://robotics.gymnasium-weingarten.de/"
}
export const ags = [robotics]