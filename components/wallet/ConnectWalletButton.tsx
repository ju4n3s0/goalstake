// src/components/wallet/ConnectWalletButton.tsx

import { Wallet } from "lucide-react";

export function ConnectWalletButton() {
  return (
    <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all active:scale-95">
      <Wallet className="h-4 w-4" />
      <span>Conectar</span>
    </button>
  );
}