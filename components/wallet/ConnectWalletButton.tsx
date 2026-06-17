"use client";

import dynamic from "next/dynamic";

export const ConnectWalletButton = dynamic(
  () =>
    import("./ConnectWalletButtonClient").then(
      (mod) => mod.ConnectWalletButtonClient
    ),
  {
    ssr: false,
    loading: () => (
      <button
        
        className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white opacity-50 transition-all duration-300 hover:bg-indigo-600 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
      >
        Conectar Wallet
      </button>
    ),
  }
);