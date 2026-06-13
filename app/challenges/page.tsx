"use client";

import { motion } from "framer-motion";
import { ChallengeCard } from "@/components/challenges/ChallengeCard";
import { challengeCatalog } from "@/data/challenges";
import { Search, Filter } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ChallengesPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                Explorar Retos
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Selecciona un reto, apuesta por ti mismo y gana recompensas.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Buscar retos..." 
                  className="pl-10 pr-4 py-2 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full md:w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-muted transition-colors font-medium">
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
              </button>
            </div>
          </motion.div>
        </header>

        <motion.section 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {challengeCatalog.map((challenge) => (
            <motion.div key={challenge.id} variants={item}>
              <ChallengeCard challenge={challenge} />
            </motion.div>
          ))}
        </motion.section>
        
        {challengeCatalog.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No se encontraron retos disponibles en este momento.</p>
          </div>
        )}
      </div>
    </main>
  );
}
