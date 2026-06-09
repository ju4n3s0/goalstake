
import Link from "next/link";
import { Challenge } from "@/interfaces/challenge";

interface ChallengeCardProps {
    challenge: Challenge;
}

    export function ChallengeCard({ challenge }: ChallengeCardProps) {
    return (
        <article className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Verificado
            </span>

            <span className="text-sm font-semibold">
            {challenge.entryAmount} USDT
            </span>
        </div>

        <h3 className="text-lg font-bold">{challenge.title}</h3>

        <p className="mt-2 text-sm text-gray-600">
            {challenge.description}
        </p>

        <div className="mt-4 space-y-1 text-sm text-gray-700">
            <p>Duración: {challenge.durationDays} días</p>
            <p>Verificación: {challenge.verification}</p>
        </div>

        <Link
            href={`/challenges/${challenge.id}`}
            className="mt-5 block rounded-xl bg-black px-4 py-2 text-center text-sm font-semibold text-white"
        >
            Ver reto
        </Link>
        </article>
    );
}