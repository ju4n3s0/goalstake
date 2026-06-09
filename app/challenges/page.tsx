// src/app/challenges/page.tsx

import { ChallengeCard } from "@/components/challenges/ChallengeCard";
import { challengeCatalog } from "@/data/challenges";

export default function ChallengesPage() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
            <h1 className="text-3xl font-bold">Catálogo de retos</h1>
            <p className="mt-2 text-gray-600">
            Retos listos para usar con métodos de verificación definidos.
            </p>
        </div>

        <section className="grid gap-6 md:grid-cols-3">
            {challengeCatalog.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
        </section>
        </main>
    );
}