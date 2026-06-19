"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { formatEther } from "viem";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ShieldCheck,
  Users,
  Trophy,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import {
  CHALLENGE_ESCROW_ABI,
  CHALLENGE_ESCROW_ADDRESS,
} from "../../../lib/contracts";
import { celoSepolia } from "../../../lib/wagmi";

interface ChallengeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const resolvedParams = use(params);
  const challengeId = BigInt(resolvedParams.id);

  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: challenge } = useReadContract({
    address: CHALLENGE_ESCROW_ADDRESS,
    abi: CHALLENGE_ESCROW_ABI,
    functionName: "challenges",
    args: [challengeId],
  });

  const { data: hasJoined } = useReadContract({
    address: CHALLENGE_ESCROW_ADDRESS,
    abi: CHALLENGE_ESCROW_ABI,
    functionName: "joined",
    args: [challengeId, address!],
    query: {
      enabled: Boolean(address),
    },
  });

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  if (!mounted) return null;

  if (!challenge) {
    return (
      <main className="min-h-screen bg-muted/30 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/challenges" className="text-sm text-muted-foreground">
            ← Volver al catálogo
          </Link>
          <div className="mt-8 rounded-3xl border bg-card p-8">
            Cargando reto on-chain...
          </div>
        </div>
      </main>
    );
  }

  const title = String(challenge[1]);
  const description = String(challenge[2]);
  const entryFee = challenge[3];
  const totalPool = challenge[4];
  const participantCount = challenge[5];
  const winner = String(challenge[7]);
  const status = Number(challenge[8]);

  const isOpen = status === 0;
  const isFinished = status === 1;
  const isPrizeClaimed = status === 2;
  const isWinner =
    Boolean(address) && winner.toLowerCase() === address?.toLowerCase();

  function handleJoin() {
    if (!isConnected || !address) {
      console.log("Primero conecta tu wallet");
      return;
    }

    if (hasJoined) {
      console.log("Ya estás participando");
      return;
    }

    writeContract({
      address: CHALLENGE_ESCROW_ADDRESS,
      abi: CHALLENGE_ESCROW_ABI,
      functionName: "joinChallenge",
      args: [challengeId],
      value: entryFee,
      account: address,
      chain: celoSepolia,
    });
  }

  function handleClaimPrize() {
    if (!isConnected || !address) {
      console.log("Primero conecta tu wallet");
      return;
    }

    if (!isWinner) {
      console.log("Solo el ganador puede reclamar el premio");
      return;
    }

    writeContract({
      address: CHALLENGE_ESCROW_ADDRESS,
      abi: CHALLENGE_ESCROW_ABI,
      functionName: "claimPrize",
      args: [challengeId],
      account: address,
      chain: celoSepolia,
    });
  }

  return (
    <main className="min-h-screen bg-muted/30 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/challenges"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Volver al catálogo
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.5rem] border border-border bg-card p-8 shadow-xl shadow-primary/5 md:p-12"
        >
          <div className="mb-8 flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <ShieldCheck className="h-4 w-4" />
              Reto on-chain
            </span>

            <div className="rounded-full bg-muted px-4 py-1.5 text-sm font-bold text-muted-foreground">
              Entrada:{" "}
              <span className="text-foreground">
                {formatEther(entryFee)} CELO
              </span>
            </div>
          </div>

          <p className="mb-2 text-sm font-bold text-muted-foreground">
            Reto #{resolvedParams.id}
          </p>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            {title}
          </h1>

          <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            <MetricCard
              icon={<Clock className="h-5 w-5 text-secondary" />}
              label="Estado"
              value={
                isOpen
                  ? "Abierto"
                  : isFinished
                  ? "Finalizado"
                  : "Reclamado"
              }
            />
            <MetricCard
              icon={<Users className="h-5 w-5 text-accent" />}
              label="Participantes"
              value={participantCount.toString()}
            />
            <MetricCard
              icon={<Trophy className="h-5 w-5 text-primary" />}
              label="Pozo actual"
              value={`${formatEther(totalPool)} CELO`}
            />
          </div>

          <div className="mb-12 space-y-6">
            <div className="rounded-3xl border border-border bg-muted/30 p-6">
              <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Participación
              </h2>
              <p className="text-muted-foreground">
                {hasJoined
                  ? "Ya estás participando en este reto."
                  : "Aún no estás participando en este reto."}
              </p>
            </div>

            <div className="rounded-3xl border border-secondary/20 bg-secondary/5 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <AlertCircle className="h-5 w-5 text-secondary" />
                Reglas
              </h2>
              <ul className="grid gap-3 text-muted-foreground">
                <RuleItem text="Debes depositar el monto de entrada para participar." />
                <RuleItem text="Todos los participantes aportan al mismo pozo." />
                <RuleItem text="El owner de la demo selecciona el ganador." />
                <RuleItem text="El ganador reclama el 95% del pozo y la plataforma recibe 5%." />
              </ul>
            </div>
          </div>

          {isOpen && (
            <button
              onClick={handleJoin}
              disabled={isPending || isConfirming || Boolean(hasJoined)}
              className="group flex w-full items-center justify-center gap-2 rounded-[2rem] bg-primary py-5 text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
            >
              <span>
                {hasJoined
                  ? "Ya estás participando"
                  : isPending
                  ? "Esperando wallet..."
                  : isConfirming
                  ? "Confirmando..."
                  : "Unirme al reto ahora"}
              </span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {isFinished && isWinner && (
            <button
              onClick={handleClaimPrize}
              disabled={isPending || isConfirming}
              className="w-full rounded-[2rem] bg-green-600 py-5 text-lg font-extrabold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isPending
                ? "Esperando wallet..."
                : isConfirming
                ? "Confirmando..."
                : "Reclamar premio"}
            </button>
          )}

          {isFinished && !isWinner && (
            <p className="text-center font-semibold text-muted-foreground">
              Este reto ya finalizó. Ganador: {winner}
            </p>
          )}

          {isPrizeClaimed && (
            <p className="text-center font-semibold text-green-600">
              Premio reclamado.
            </p>
          )}

          {hash && (
            <p className="mt-4 break-all text-xs text-muted-foreground">
              Tx: {hash}
            </p>
          )}

          {isSuccess && (
            <p className="mt-4 font-semibold text-green-600">
              Transacción confirmada.
            </p>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600">
              Error: {error.message}
            </p>
          )}
        </motion.section>
      </div>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-border/50 bg-muted/50 p-6">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-2xl font-black">{value}</p>
    </div>
  );
}

function RuleItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm font-medium">
      <div className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-secondary" />
      {text}
    </li>
  );
}