// src/app/challenges/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { getChallengeById } from "@/data/challenges";

interface ChallengeDetailPageProps {
    params: {
        id: string;
    };
}

export default function ChallengeDetailPage({
    params,
}: ChallengeDetailPageProps) {
    const challenge = getChallengeById(params.id);

    if (!challenge) {
        notFound();
    }

    const fakeParticipants = 12;
    const fakePot = fakeParticipants * challenge.entryAmount;

    return (
        <main className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/challenges" className="text-sm text-gray-500">
            ← Volver al catálogo
        </Link>

        <section className="mt-6 rounded-3xl border bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Reto verificado
            </span>

            <span className="text-sm font-semibold">
                Entrada: {challenge.entryAmount} USDT
            </span>
            </div>

            <h1 className="text-4xl font-bold">{challenge.title}</h1>

            <p className="mt-4 text-lg text-gray-600">
            {challenge.description}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Duración</p>
                <p className="mt-1 text-xl font-bold">
                {challenge.durationDays} días
                </p>
            </div>

            <div className="rounded-2xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Participantes</p>
                <p className="mt-1 text-xl font-bold">{fakeParticipants}</p>
            </div>

            <div className="rounded-2xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Pozo actual</p>
                <p className="mt-1 text-xl font-bold">{fakePot} USDT</p>
            </div>
            </div>

            <div className="mt-8 rounded-2xl border p-5">
            <h2 className="text-xl font-bold">Verificación</h2>
            <p className="mt-2 text-gray-600">
                Este reto se validará mediante:{" "}
                <strong>{challenge.verification}</strong>.
            </p>
            </div>

            <div className="mt-8 rounded-2xl bg-yellow-50 p-5">
            <h2 className="text-xl font-bold">Reglas</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                <li>Debes depositar el monto de entrada para participar.</li>
                <li>Si completas el reto, sigues compitiendo por el pozo.</li>
                <li>Si fallas, pierdes tu depósito.</li>
                <li>La plataforma cobra una comisión sobre el pozo final.</li>
            </ul>
            </div>

            <button className="mt-8 w-full rounded-xl bg-black px-5 py-3 font-semibold text-white">
            Unirme al reto
            </button>
        </section>
        </main>
    );
}