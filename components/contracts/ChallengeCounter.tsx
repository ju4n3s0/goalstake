"use client";

import { useReadContract } from "wagmi";
import {
  CHALLENGE_ESCROW_ABI,
  CHALLENGE_ESCROW_ADDRESS,
} from "../../lib/contracts";

export function ChallengeCounter() {
  const { data, isLoading, error } = useReadContract({
    address: CHALLENGE_ESCROW_ADDRESS,
    abi: CHALLENGE_ESCROW_ABI,
    functionName: "challengeCount",
  });

  if (isLoading) {
    return <p className="text-sm text-gray-500">Cargando retos on-chain...</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-red-600">
        Error leyendo contrato: {error.message}
      </p>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">Retos creados en blockchain</p>
      <p className="mt-1 text-2xl font-bold">{data?.toString() ?? "0"}</p>
    </div>
  );
}