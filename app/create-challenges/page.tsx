"use client";

import { useState } from "react";
import { parseEther } from "viem";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { motion } from "framer-motion";
import { Target, Info, Clock, Coins, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { CHALLENGE_ESCROW_ABI, CHALLENGE_ESCROW_ADDRESS } from "../../lib/contracts";
import { celoSepolia } from "../../lib/wagmi";

export default function CreateChallengePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("7");
  const [entryFee, setEntryFee] = useState("0.01");

  const { address, isConnected } = useAccount();
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isConnected || !address) {
      console.log("Primero conecta tu wallet");
      return;
    }

    if (!title || !description || !entryFee) {
      console.log("Completa título, descripción y entrada");
      return;
    }

    writeContract({
      address: CHALLENGE_ESCROW_ADDRESS,
      abi: CHALLENGE_ESCROW_ABI,
      functionName: "createChallenge",
      args: [
        title,
        `${description}\nDuración: ${duration} días`,
        parseEther(entryFee),
      ],
      account: address,
      chain: celoSepolia,
    });
  }

  return (
    <main className="min-h-screen bg-muted/30 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-primary/10 text-primary mb-6"
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>

          <h1 className="text-4xl font-extrabold tracking-tight">
            Crear Reto Competitivo
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Crea un reto, define la entrada y deja que el pozo crezca con cada participante.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.5rem] border border-border bg-card p-8 md:p-12 shadow-xl shadow-primary/5"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <Target className="h-4 w-4" />
                Nombre del reto
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Running Challenge"
                className="w-full rounded-2xl border border-border bg-muted/30 px-6 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <Info className="h-4 w-4" />
                Descripción
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Gana quien más kilómetros corra esta semana."
                className="w-full rounded-2xl border border-border bg-muted/30 px-6 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Duración días
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-muted/30 px-6 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <Coins className="h-4 w-4" />
                  Entrada CELO
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-muted/30 px-6 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground">
              <ShieldCheck className="mb-2 h-4 w-4" />
              En esta demo, el owner selecciona el ganador. En la siguiente versión,
              esto se conectará con verificación de running, GitHub o Pomodoro.
            </div>

            <button
              type="submit"
              disabled={isPending || isConfirming}
              className="group w-full flex items-center justify-center gap-2 rounded-[2rem] bg-foreground py-5 text-lg font-extrabold text-background hover:bg-primary hover:text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/5 disabled:opacity-50"
            >
              <span>
                {isPending
                  ? "Esperando wallet..."
                  : isConfirming
                  ? "Confirmando..."
                  : "Lanzar Reto"}
              </span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {hash && <p className="break-all text-xs text-muted-foreground">Tx: {hash}</p>}

            {isSuccess && (
              <p className="font-semibold text-green-600">
                Reto creado correctamente. Ahora aparece en Explorar retos.
              </p>
            )}

            {error && <p className="text-sm text-red-600">Error: {error.message}</p>}
          </form>
        </motion.div>
      </div>
    </main>
  );
}