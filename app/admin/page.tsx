"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Trophy } from "lucide-react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import {
  CHALLENGE_ESCROW_ABI,
  CHALLENGE_ESCROW_ADDRESS,
} from "../../lib/contracts";
import { celoSepolia } from "../../lib/wagmi";

export default function AdminPage() {
  const [challengeId, setChallengeId] = useState("1");
  const [winner, setWinner] = useState("");
  const { address, isConnected } = useAccount();

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  function handleSelectWinner(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isConnected || !address) {
      console.log("Primero conecta tu wallet");
      return;
    }

    if (!challengeId || !winner) {
      console.log("Completa el ID del reto y la wallet ganadora");
      return;
    }

    writeContract({
      address: CHALLENGE_ESCROW_ADDRESS,
      abi: CHALLENGE_ESCROW_ABI,
      functionName: "selectWinner",
      args: [BigInt(challengeId), winner as `0x${string}`],
      account: address,
      chain: celoSepolia,
    });
  }

  return (
    <main className="min-h-screen bg-muted/30 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight">
            Panel Admin
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Selecciona el ganador de un reto competitivo. Solo la wallet owner
            del contrato puede ejecutar esta acción.
          </p>
        </header>

        <motion.form
          onSubmit={handleSelectWinner}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.5rem] border border-border bg-card p-8 shadow-xl shadow-primary/5"
        >
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-muted-foreground">
                ID del reto
              </label>
              <input
                value={challengeId}
                onChange={(e) => setChallengeId(e.target.value)}
                placeholder="Ej: 1"
                className="w-full rounded-2xl border border-border bg-muted/30 px-5 py-4 text-lg font-medium outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Wallet ganadora
              </label>
              <input
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
                placeholder="0x..."
                className="w-full rounded-2xl border border-border bg-muted/30 px-5 py-4 text-lg font-medium outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isPending || isConfirming}
              className="flex w-full items-center justify-center gap-2 rounded-[2rem] bg-foreground py-5 text-lg font-extrabold text-background transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <Trophy className="h-5 w-5" />
              {isPending
                ? "Esperando wallet..."
                : isConfirming
                ? "Confirmando..."
                : "Seleccionar ganador"}
            </button>

            {hash && (
              <p className="break-all text-xs text-muted-foreground">
                Tx: {hash}
              </p>
            )}

            {isSuccess && (
              <p className="font-semibold text-green-600">
                Ganador seleccionado correctamente.
              </p>
            )}

            {error && (
              <p className="text-sm text-red-600">
                Error: {error.message}
              </p>
            )}
          </div>
        </motion.form>

        <div className="mt-6 rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-5 text-sm text-yellow-700">
          Esta página no debe estar enlazada en la demo pública. Accede
          manualmente escribiendo <strong>/admin</strong>.
        </div>
      </div>
    </main>
  );
}