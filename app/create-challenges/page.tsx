"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Info, 
  Clock, 
  Coins, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function CreateChallengePage() {
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
          <h1 className="text-4xl font-extrabold tracking-tight">Crear Reto Personalizado</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Define tus propias reglas y reta a la comunidad.
          </p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.5rem] border border-border bg-card p-8 md:p-12 shadow-xl shadow-primary/5"
        >
          <form className="space-y-8">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <Target className="h-4 w-4" />
                Nombre del reto
              </label>
              <input
                type="text"
                placeholder="Ej: Meditar 10 minutos al día"
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
                placeholder="Explica detalladamente en qué consiste el reto..."
                className="w-full rounded-2xl border border-border bg-muted/30 px-6 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Duración (días)
                </label>
                <input
                  type="number"
                  placeholder="7"
                  className="w-full rounded-2xl border border-border bg-muted/30 px-6 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <Coins className="h-4 w-4" />
                  Entrada (USDT)
                </label>
                <input
                  type="number"
                  placeholder="5.00"
                  className="w-full rounded-2xl border border-border bg-muted/30 px-6 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                Método de resolución
              </label>
              <select className="w-full rounded-2xl border border-border bg-muted/30 px-6 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                <option>Votación de participantes</option>
                <option>Decisión del creador</option>
                <option>Árbitro designado</option>
              </select>
            </div>

            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-2 rounded-[2rem] bg-foreground py-5 text-lg font-extrabold text-background hover:bg-primary hover:text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/5"
            >
              <span>Lanzar Reto</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
