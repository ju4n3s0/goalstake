// components/contracts/ChallengeStats.tsx
"use client";

import { formatEther } from "viem";
import { useReadContract } from "wagmi";
import {
  CHALLENGE_ESCROW_ABI,
  CHALLENGE_ESCROW_ADDRESS,
} from "../../lib/contracts";

export function ChallengeStats() {
  const challengeId = 1n;

  const { data: challenge } = useReadContract({
    address: CHALLENGE_ESCROW_ADDRESS,
    abi: CHALLENGE_ESCROW_ABI,
    functionName: "challenges",
    args: [challengeId],
  });

  if (!challenge) return <p>Cargando reto...</p>;

  const title = challenge[1];
  const entryFee = challenge[3];
  const totalPool = challenge[4];
  const participantCount = challenge[5];

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">Estado del reto #{String(challengeId)}</h2>

      <p>Reto: {String(title)}</p>
      <p>Entrada: {formatEther(entryFee)} CELO</p>
      <p>Pozo: {formatEther(totalPool)} CELO</p>
      <p>Participantes: {participantCount.toString()}</p>
    </div>
  );
}