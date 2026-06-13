"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Target, 
  Wallet, 
  Trophy, 
  ShieldCheck, 
  Users,
  TrendingUp
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Celo MiniPay - Do it all with Stablecoins
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl mb-6"
          >
            Apostar por ti mismo  <span className="text-primary"> <br />
              
              nunca fue tan rentable</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10"
          >
            GoalStake te ayuda a cumplir tus objetivos vinculando tu compromiso con incentivos económicos reales. Únete a retos, deposita y gana.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
            <Link
              href="/challenges"
              className="group flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              Explorar retos
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/create-challenges"
              className="rounded-2xl border-2 border-border bg-background px-8 py-4 text-base font-bold hover:bg-muted transition-all hover:scale-105 active:scale-95"
            >
              Crear mi propio reto
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* How it works Section */}
      <section className="py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ¿Cómo funciona?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Simple, seguro y diseñado para que ganes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <StepCard 
              icon={<Target className="h-6 w-6" />}
              title="Elige un reto"
              description="Busca un objetivo que resuene contigo o crea uno personalizado."
              step="1"
            />
            <StepCard 
              icon={<Wallet className="h-6 w-6" />}
              title="Stake con MiniPay"
              description="Deposita una pequeña cantidad para demostrar tu compromiso."
              step="2"
            />
            <StepCard 
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Cumple y Verifica"
              description="Completa las tareas y sube las pruebas necesarias."
              step="3"
            />
            <StepCard 
              icon={<Trophy className="h-6 w-6" />}
              title="Gana el Pozo"
              description="Si cumples, recuperas tu stake más una parte del pozo de los que fallaron."
              step="4"
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-24 border-y border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                No solo se trata de dinero, se trata de <span className="text-secondary">disciplina</span>.
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-none h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Comunidad Activa</h3>
                    <p className="text-muted-foreground">Únete a cientos de personas que ya están mejorando sus vidas.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Incentivo Real</h3>
                    <p className="text-muted-foreground">La psicología de la pérdida es el motivador más fuerte conocido.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-primary/20 blur-3xl opacity-50" />
                <div className="relative rounded-3xl border border-border bg-card p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">G</div>
                            <span className="font-bold">GoalStake Stats</span>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Live Data</span>
                    </div>
                    <div className="space-y-6">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-primary" 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-muted/50">
                                <p className="text-sm text-muted-foreground">Retos Completados</p>
                                <p className="text-2xl font-bold text-primary">1,284</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/50">
                                <p className="text-sm text-muted-foreground">Pozo Distribuido</p>
                                <p className="text-2xl font-bold text-secondary">$5,420</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-8">¿Listo para comprometerte?</h2>
        <Link
          href="/challenges"
          className="inline-flex items-center gap-2 rounded-2xl bg-foreground text-background px-10 py-5 text-lg font-bold hover:opacity-90 transition-all hover:scale-105"
        >
          Empezar ahora
        </Link>
      </section>
    </main>
  );
}

function StepCard({ icon, title, description, step }: { icon: React.ReactNode, title: string, description: string, step: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="relative p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-all"
    >
      <div className="absolute top-4 right-4 text-4xl font-black text-muted/20 select-none">
        0{step}
      </div>
      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
