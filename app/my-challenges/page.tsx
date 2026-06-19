"use client";

import { formatEther } from "viem";
import { motion } from "framer-motion";
import { Trophy, Clock, Target, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
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

function MyChallengeItem({ id }: { id: bigint }) {
  const { address } = useAccount();

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

  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  if (!challenge || !hasJoined || !address) return null;

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
  const isWinner = winner.toLowerCase() === address.toLowerCase();

  function handleClaimPrize() {
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
    <motion.article
      variants={item}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="mb-6 flex items-center justify-between">
        <StatusBadge
          status={
            isOpen
              ? "active"
              : isPrizeClaimed
              ? "claimed"
              : isWinner
              ? "completed"
              : "lost"
          }
        />

        <span className="text-sm font-bold flex items-center gap-1.5 text-primary">
          <Target className="h-4 w-4" />
          {formatEther(entryFee)} CELO
        </span>
      </div>

      <p className="mb-2 text-xs font-bold text-muted-foreground">
        Reto #{id.toString()}
      </p>

      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="mb-6 text-sm text-muted-foreground">
        {description}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-muted/50 p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Trophy className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Pozo
            </span>
          </div>
          <p className="text-lg font-bold">{formatEther(totalPool)} CELO</p>
        </div>

        <div className="rounded-2xl bg-muted/50 p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Participantes
            </span>
          </div>
          <p className="text-lg font-bold">{participantCount.toString()}</p>
        </div>
      </div>

      {isFinished && isWinner && (
        <button
          onClick={handleClaimPrize}
          disabled={isPending || isConfirming}
          className="mt-6 w-full rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          {isPending
            ? "Esperando wallet..."
            : isConfirming
            ? "Confirmando..."
            : "Reclamar recompensa"}
        </button>
      )}

      {isFinished && !isWinner && (
        <p className="mt-6 text-sm font-semibold text-muted-foreground">
          Este reto ya finalizó. No fuiste el ganador.
        </p>
      )}

      {isPrizeClaimed && (
        <p className="mt-6 text-sm font-semibold text-green-600">
          Premio reclamado.
        </p>
      )}

      {isSuccess && (
        <p className="mt-4 text-sm font-semibold text-green-600">
          Transacción confirmada.
        </p>
      )}
    </motion.article>
  );
}

export default function MyChallengesPage() {
  const { address, isConnected } = useAccount();

  const { data: challengeCount } = useReadContract({
    address: CHALLENGE_ESCROW_ADDRESS,
    abi: CHALLENGE_ESCROW_ABI,
    functionName: "challengeCount",
  });

  const count = Number(challengeCount || 0n);

  return (
    <main className="min-h-screen bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Mis Retos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Monitorea tus retos competitivos y reclama tus recompensas.
          </p>
        </header>

        {!isConnected && (
          <div className="rounded-3xl border border-border bg-card p-8">
            Conecta tu wallet para ver tus retos.
          </div>
        )}

        {isConnected && count === 0 && (
          <div className="rounded-3xl border border-border bg-card p-8">
            Todavía no hay retos creados.
          </div>
        )}

        {isConnected && count > 0 && (
          <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: count }, (_, index) => (
              <MyChallengeItem key={index + 1} id={BigInt(index + 1)} />
            ))}
          </motion.section>
        )}
      </div>
    </main>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { label: string; icon: any; classes: string }> = {
    active: {
      label: "Activo",
      icon: TrendingUp,
      classes: "bg-blue-500/10 text-blue-500 ring-blue-500/20",
    },
    completed: {
      label: "Ganado",
      icon: CheckCircle2,
      classes: "bg-primary/10 text-primary ring-primary/20",
    },
    lost: {
      label: "Perdido",
      icon: AlertCircle,
      classes: "bg-red-500/10 text-red-500 ring-red-500/20",
    },
    claimed: {
      label: "Reclamado",
      icon: Trophy,
      classes: "bg-green-500/10 text-green-600 ring-green-500/20",
    },
  };

  const config = configs[status] || configs.active;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ring-inset ${config.classes}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}