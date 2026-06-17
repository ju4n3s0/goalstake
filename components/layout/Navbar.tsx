// src/components/layout/Navbar.tsx

"use client";

import Link from "next/link";
import { ConnectWalletButton } from "../wallet/ConnectWalletButton";
import { ThemeToggle } from "../theme-toggle";
import { Target } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Target className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>GoalStake</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/challenges" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Explorar
            </Link>
            <Link href="/create-challenges" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Crear
            </Link>
            <Link href="/my-challenges" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Mis Retos
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ConnectWalletButton />
          </div>
        </div>
      </nav>
    </header>
  );  
}