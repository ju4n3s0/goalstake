"use client";

import { motion } from "framer-motion";
import { Trophy, Clock, Target, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";

const myChallenges = [
  {
    id: "steps-7-days",
    title: "10.000 pasos diarios",
    status: "active",
    progress: 57,
    entryAmount: 1,
    prizePool: 24,
    daysLeft: 3,
  },
  {
    id: "github-commits",
    title: "Commit diario",
    status: "completed",
    progress: 100,
    entryAmount: 1,
    prizePool: 18,
    daysLeft: 0,
  },
  {
    id: "pomodoro-study",
    title: "Estudio Pomodoro",
    status: "lost",
    progress: 40,
    entryAmount: 1,
    prizePool: 12,
    daysLeft: 0,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

export default function MyChallengesPage() {
  return (
    <main className="min-h-screen bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Mis Retos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Monitorea tu progreso y reclama tus recompensas.
          </p>
        </header>

        <motion.section 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {myChallenges.map((challenge) => (
            <motion.article
              key={challenge.id}
              variants={item}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="mb-6 flex items-center justify-between">
                <StatusBadge status={challenge.status} />
                <span className="text-sm font-bold flex items-center gap-1.5 text-primary">
                   <Target className="h-4 w-4" />
                   {challenge.entryAmount} USDT
                </span>
              </div>

              <h3 className="text-xl font-bold mb-6 group-hover:text-primary transition-colors">
                {challenge.title}
              </h3>

              <div className="mb-8">
                <div className="mb-3 flex justify-between text-sm font-bold">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className={challenge.status === 'lost' ? 'text-red-500' : 'text-primary'}>
                    {challenge.progress}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${challenge.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${
                        challenge.status === 'completed' ? 'bg-primary' : 
                        challenge.status === 'lost' ? 'bg-red-500' : 
                        'bg-secondary'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-muted/50 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Trophy className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Pozo</span>
                  </div>
                  <p className="text-lg font-bold">{challenge.prizePool} USDT</p>
                </div>
                <div className="rounded-2xl bg-muted/50 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Tiempo</span>
                  </div>
                  <p className="text-lg font-bold">
                    {challenge.daysLeft > 0 ? `${challenge.daysLeft}d` : "Fin"}
                  </p>
                </div>
              </div>

              {challenge.status === 'completed' && (
                <button className="mt-6 w-full rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                  Reclamar Recompensa
                </button>
              )}
            </motion.article>
          ))}
        </motion.section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { label: string, icon: any, classes: string }> = {
    active: { 
      label: "Activo", 
      icon: TrendingUp, 
      classes: "bg-blue-500/10 text-blue-500 ring-blue-500/20" 
    },
    completed: { 
      label: "Completado", 
      icon: CheckCircle2, 
      classes: "bg-primary/10 text-primary ring-primary/20" 
    },
    lost: { 
      label: "Perdido", 
      icon: AlertCircle, 
      classes: "bg-red-500/10 text-red-500 ring-red-500/20" 
    }
  };

  const config = configs[status] || configs.active;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ring-inset ${config.classes}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
