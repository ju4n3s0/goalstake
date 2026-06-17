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
        disabled
        className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white opacity-50"
      >
        Conectar Wallet
      </button>
    ),
  }
);