// src/components/layout/Navbar.tsx

import Link from "next/link";
import { ConnectWalletButton } from "../wallet/ConnectWalletButton";

export function Navbar() {
    return (
        <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold">
            GoalStake
            </Link>

            <div className="flex items-center gap-4">
            <Link href="/challenges" className="text-sm">
                Retos
            </Link>
            <Link href="/create-challenge" className="text-sm">
                Crear reto
            </Link>
            <Link href="/my-challenges" className="text-sm">
                Mis retos
            </Link>
            <ConnectWalletButton />
            </div>
        </nav>
        </header>
    );
}