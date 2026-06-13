"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { getChallengeById } from "@/data/challenges";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ShieldCheck, 
  Users, 
  Trophy, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

interface ChallengeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ChallengeDetailPage({
  params,
}: ChallengeDetailPageProps) {
  const resolvedParams = use(params);
  const challenge = getChallengeById(resolvedParams.id);

  if (!challenge) {
    notFound();
  }

  const fakeParticipants = 12;
  const fakePot = fakeParticipants * challenge.entryAmount;

  return (
    <main className="min-h-screen bg-muted/30 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link 
          href="/challenges" 
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Volver al catálogo
        </Link>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.5rem] border border-border bg-card p-8 md:p-12 shadow-xl shadow-primary/5"
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <ShieldCheck className="h-4 w-4" />
              Reto verificado
            </span>

            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground bg-muted px-4 py-1.5 rounded-full">
              Entrada: <span className="text-foreground">{challenge.entryAmount} USDT</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            {challenge.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            {challenge.description}
          </p>

          <div className="grid gap-4 sm:grid-cols-3 mb-12">
            <MetricCard 
                icon={<Clock className="h-5 w-5 text-secondary" />}
                label="Duración"
                value={`${challenge.durationDays} días`}
            />
            <MetricCard 
                icon={<Users className="h-5 w-5 text-accent" />}
                label="Participantes"
                value={fakeParticipants.toString()}
            />
            <MetricCard 
                icon={<Trophy className="h-5 w-5 text-primary" />}
                label="Pozo actual"
                value={`${fakePot} USDT`}
            />
          </div>

          <div className="space-y-6 mb-12">
            <div className="rounded-3xl border border-border bg-muted/30 p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Verificación
              </h2>
              <p className="text-muted-foreground">
                Este reto se validará automáticamente mediante:{" "}
                <strong className="text-foreground">{challenge.verification}</strong>.
              </p>
            </div>

            <div className="rounded-3xl border border-secondary/20 bg-secondary/5 p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-secondary" />
                Reglas del Juego
              </h2>
              <ul className="grid gap-3 text-muted-foreground">
                <RuleItem text="Debes depositar el monto de entrada para participar." />
                <RuleItem text="Si completas el reto, sigues compitiendo por el pozo." />
                <RuleItem text="Si fallas, tu stake se distribuye entre los ganadores." />
                <RuleItem text="La plataforma cobra un 5% de comisión sobre el pozo." />
              </ul>
            </div>
          </div>

          <button className="group w-full flex items-center justify-center gap-2 rounded-[2rem] bg-primary py-5 text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]">
            <span>Unirme al reto ahora</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.section>
      </div>
    </main>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="rounded-3xl bg-muted/50 p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                {icon}
                <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-2xl font-black">{value}</p>
        </div>
    );
}

function RuleItem({ text }: { text: string }) {
    return (
        <li className="flex items-start gap-3 text-sm font-medium">
            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary flex-none" />
            {text}
        </li>
    );
}
