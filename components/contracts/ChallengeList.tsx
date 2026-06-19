// components/contracts/ChallengeList.tsx
"use client";

import { formatEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import {
  CHALLENGE_ESCROW_ABI,
  CHALLENGE_ESCROW_ADDRESS,
} from "../../lib/contracts";
import { celoSepolia } from "../../lib/wagmi";
import Link from "next/link";

function ChallengeItem({ id }: { id: bigint }) {
  const { address, isConnected } = useAccount();

  const { data: challenge } = useReadContract({
    address: CHALLENGE_ESCROW_ADDRESS,
    abi: CHALLENGE_ESCROW_ABI,
    functionName: "challenges",
    args: [id],
  });

  const { data: hasJoined } = useReadContract({
    address: CHALLENGE_ESCROW_ADDRESS,
    abi: CHALLENGE_ESCROW_ABI,
    functionName: "joined",
    args: [id, address!],
    query: {
      enabled: Boolean(address),
    },
  });

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  if (!challenge) return null;

  const title = challenge[1];
  const description = challenge[2];
  const entryFee = challenge[3];
  const totalPool = challenge[4];
  const participantCount = challenge[5];
  const winner = challenge[7];
  const status = challenge[8];

  const isOpen = Number(status) === 0;
  const isFinished = Number(status) === 1;
  const isPrizeClaimed = Number(status) === 2;
  if (isPrizeClaimed) return null;

  const isWinner =
    Boolean(address) &&
    String(winner).toLowerCase() === String(address).toLowerCase();

  function handleJoin() {
    if (!isConnected || !address) {
      alert("Primero conecta tu wallet");
      return;
    }

    if (hasJoined) {
      alert("Ya estás participando");
      return;
    }

    writeContract({
      address: CHALLENGE_ESCROW_ADDRESS,
      abi: CHALLENGE_ESCROW_ABI,
      functionName: "joinChallenge",
      args: [id],
      value: entryFee,
      account: address,
      chain: celoSepolia,
    });
  }

  function handleClaimPrize() {
    if (!isConnected || !address) {
      alert("Primero conecta tu wallet");
      return;
    }

    if (!isWinner) {
      alert("Solo el ganador puede reclamar el premio");
      return;
    }

    writeContract({
      address: CHALLENGE_ESCROW_ADDRESS,
      abi: CHALLENGE_ESCROW_ABI,
      functionName: "claimPrize",
      args: [id],
      account: address,
      chain: celoSepolia,
    });
  }

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-xs text-gray-500">Reto #{id.toString()}</p>

      <h3 className="text-lg font-bold">{String(title)}</h3>
      <p className="text-sm text-gray-600">{String(description)}</p>

      <div className="mt-3 text-sm">
        <p>Entrada: {formatEther(entryFee)} CELO</p>
        <p>Pozo: {formatEther(totalPool)} CELO</p>
        <p>Participantes: {participantCount.toString()}</p>
        <p>
          Estado:{" "}
          {isOpen
            ? "Abierto"
            : isFinished
            ? "Finalizado"
            : "Premio reclamado"}
        </p>
        <p>Ganador: {String(winner)}</p>
      </div>

        <Link
        href={`/challenges/${id.toString()}`}
        className="mt-4 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-muted"
        >
        Ver detalle
        </Link>

      {isOpen && (
        <button
          onClick={handleJoin}
          disabled={isPending || isConfirming || Boolean(hasJoined)}
          className="mt-4 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {hasJoined
            ? "Ya estás participando"
            : isPending
            ? "Esperando wallet..."
            : isConfirming
            ? "Confirmando..."
            : "Unirme al reto"}
        </button>
      )}

      {isFinished && isWinner && (
        <button
          onClick={handleClaimPrize}
          disabled={isPending || isConfirming}
          className="mt-4 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {isPending
            ? "Esperando wallet..."
            : isConfirming
            ? "Confirmando..."
            : "Reclamar premio"}
        </button>
      )}

      {isFinished && !isWinner && (
        <p className="mt-3 text-sm text-gray-500">
          Este reto ya tiene ganador.
        </p>
      )}

      {isPrizeClaimed && (
        <p className="mt-3 text-sm font-semibold text-green-600">
          Premio reclamado.
        </p>
      )}

      {isSuccess && (
        <p className="mt-3 text-sm font-semibold text-green-600">
          Transacción confirmada.
        </p>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          Error: {error.message}
        </p>
      )}
    </div>
  );
}

export function ChallengeList() {
    const { data: challengeCount } = useReadContract({
        address: CHALLENGE_ESCROW_ADDRESS,
        abi: CHALLENGE_ESCROW_ABI,
        functionName: "challengeCount",
    });

    const count = Number(challengeCount || 0n);

    if (count === 0) {
        return (
        <p className="text-sm text-gray-500">
            Todavía no hay retos creados.
        </p>
        );
    }

    return (
        <div className="space-y-4">
        {Array.from({ length: count }, (_, index) => (
            <ChallengeItem key={index + 1} id={BigInt(index + 1)} />
        ))}
        </div>
    );
}