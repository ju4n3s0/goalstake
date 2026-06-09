// src/data/challenges.ts

import { Challenge } from "@/interfaces/challenge";

export const challengeCatalog: Challenge[] = [
    {
        id: "steps-7-days",
        title: "10.000 pasos diarios",
        description: "Completa 10.000 pasos diarios durante 7 días.",
        verification: "Google Fit / Apple Health",
        durationDays: 7,
        entryAmount: 1,
        type: "verified",
    },
    {
        id: "github-commits",
        title: "Commit diario",
        description: "Haz al menos un commit diario durante 7 días.",
        verification: "GitHub API",
        durationDays: 7,
        entryAmount: 1,
        type: "verified",
    },
    {
        id: "pomodoro-study",
        title: "Estudio Pomodoro",
        description: "Completa 4 pomodoros diarios durante 5 días.",
        verification: "Temporizador interno",
        durationDays: 5,
        entryAmount: 1,
        type: "verified",
    },
];

export function getChallengeById(id: string) {
    return challengeCatalog.find((challenge) => challenge.id === id);
}

