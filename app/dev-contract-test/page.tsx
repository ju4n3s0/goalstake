"use client";

import { ChallengeCounter } from "../../components/contracts/ChallengeCounter";
import { CreateChallengeButton } from "../../components/contracts/CreateChallengeButton";
import { JoinChallengeButton } from "../../components/JoinChallengeButton";
import { ChallengeStats } from "../../components/contracts/ChallengeStats";

export default function DevContractTestPage() {
    return (
        <main className="min-h-screen p-8">
        <h1 className="mb-6 text-3xl font-bold">Prueba contrato V1</h1>

        <div className="space-y-6">
            <ChallengeCounter />
            <CreateChallengeButton />
            <JoinChallengeButton />
            <ChallengeStats />
        </div>
        </main>
    );
}