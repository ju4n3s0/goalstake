"use client";

import { useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { celoSepolia } from "../lib/wagmi";
import {
  CHALLENGE_ESCROW_ABI,
  CHALLENGE_ESCROW_ADDRESS,
} from "../lib/contracts";

export function JoinChallengeButton() {
    const [challengeId, setChallengeId] = useState("1");
    const { address, isConnected } = useAccount();
    const id = BigInt(challengeId || "0");

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

    const title = challenge ? (challenge as any)[1] : "";
    const description = challenge ? (challenge as any)[2] : "";
    const entryFee = challenge ? (challenge as any)[3] : 0n;

    function handleJoin() {
        if (!isConnected || !address) {
            console.log("Primero conecta tu wallet");
            return;
        }
      
        if (hasJoined) {
            console.log("Ya estás participando en este reto");
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

return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Unirse a reto on-chain</h2>

        <input
            value={challengeId}
            onChange={(e) => setChallengeId(e.target.value)}
            placeholder="ID del reto"
            className="mt-4 w-full rounded-xl border px-4 py-2 text-sm"
        />

        {challenge && (
            <p className="mt-3 text-sm text-gray-600">
            Reto: <strong>{title}</strong>
            <br />
            Entrada: {entryFee.toString()} wei
            </p>
        )}

        {hasJoined && (
            <p className="mt-3 text-sm font-semibold text-green-600">
            Ya estás participando en este reto.
            </p>
        )}

        <p className="mt-2 text-xs text-gray-500">
        Wallet: {address}
        <br />
        ID: {challengeId}
        <br />
        Joined: {String(hasJoined)}
        <br />
        Reto leído: {String(Boolean(challenge))}
        <br />
        Entry fee: {entryFee.toString()}
        </p>

        <button
        onClick={handleJoin}
        disabled={
            isPending ||
            isConfirming ||
            entryFee === 0n ||
            Boolean(hasJoined)
        }
        >
        {hasJoined
            ? "Ya estás participando"
            : isPending
            ? "Esperando wallet..."
            : isConfirming
            ? "Confirmando..."
            : "Unirme al reto"}
        </button>

        {hash && <p className="mt-3 break-all text-xs text-gray-500">Tx: {hash}</p>}

        {isSuccess && (
            <p className="mt-3 text-sm font-semibold text-green-600">
            Te uniste correctamente.
            </p>
        )}

        {error && <p className="mt-3 text-sm text-red-600">Error: {error.message}</p>}
    </div>
);
}