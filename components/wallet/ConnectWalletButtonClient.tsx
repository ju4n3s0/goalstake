"use client";

import {
    useAccount,
    useConnect,
    useDisconnect,
    useChainId,
    useSwitchChain,
} from "wagmi";
import { celoSepolia } from "@/lib/wagmi";

function shortenAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function ConnectWalletButtonClient() {
    const { address, isConnected } = useAccount();
    const { connect, connectors, isPending } = useConnect();
    const { disconnect } = useDisconnect();
    const chainId = useChainId();
    const { switchChain, isPending: isSwitching } = useSwitchChain();

    const injectedConnector =
        connectors.find((connector) => connector.type === "injected") ??
        connectors[0];

    const isOnCeloSepolia = chainId === celoSepolia.id;

    if (!isConnected || !address) {
        return (
        <button
            onClick={() => connect({ connector: injectedConnector })}
            disabled={isPending || !injectedConnector}
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
            {isPending ? "Conectando..." : "Conectar Wallet"}
        </button>
        );
    }

    return (
        <div className="flex items-center gap-2">
        {!isOnCeloSepolia && (
            <button
            onClick={() => switchChain({ chainId: celoSepolia.id })}
            disabled={isSwitching}
            className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
            {isSwitching ? "Cambiando..." : "Cambiar a Celo Sepolia"}
            </button>
        )}

        <div className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white">
            {shortenAddress(address)} · Chain {chainId}
        </div>

        <button
            onClick={() => disconnect()}
            className="rounded-xl border px-3 py-2 text-sm font-semibold"
        >
            Salir
        </button>
        </div>
    );
}