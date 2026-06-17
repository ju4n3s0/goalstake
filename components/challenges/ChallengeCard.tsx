import Link from "next/link";
import type { Challenge } from "../../interfaces/challenge";
import { Clock, Shield, Coins, ArrowRight } from "lucide-react";

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="absolute top-0 right-0 p-4">
        <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
          <Shield className="h-3 w-3" />
          Verificado
        </div>
      </div>

      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        <Coins className="h-6 w-6" />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
        {challenge.title}
      </h3>

      <p className="mb-6 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {challenge.description}
      </p>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
          <Clock className="h-4 w-4 text-secondary" />
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Duración</p>
            <p className="text-xs font-bold">{challenge.durationDays} días</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
          <Coins className="h-4 w-4 text-primary" />
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Entrada</p>
            <p className="text-xs font-bold">{challenge.entryAmount} USDT</p>
          </div>
        </div>
      </div>

      <Link
        href={`/challenges/${challenge.id}`}
        className="flex items-center justify-center gap-2 w-full rounded-2xl bg-foreground py-3 text-sm font-bold text-background group-hover:bg-primary group-hover:text-primary-foreground transition-all"
      >
        <span>Ver Detalles</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}