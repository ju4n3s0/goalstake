"use client";

import {
    useAccount,
    useConnect,
    useDisconnect,
    useChainId,
    useSwitchChain,
} from "wagmi";
import { celoSepolia } from "../../lib/wagmi";

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

    // ESTADO 1: DESCONECTADO / CONECTANDO
    if (!isConnected || !address) {
        return (
        <button
            onClick={() => connect({ connector: injectedConnector })}
            disabled={isPending || !injectedConnector}
            // Agregamos transiciones, hover de brillo (indigo) y cursor especial si está cargando
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-indigo-600 enabled:hover:scale-105 enabled:hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
        >
            {isPending ? "Conectando..." : "Conectar Wallet"}
        </button>
        );
    }

    // ESTADO 2: CONECTADO
    return (
        <div className="flex items-center gap-2">
        {/* Botón de advertencia para cambiar de red */}
        {!isOnCeloSepolia && (
            <button
            onClick={() => switchChain({ chainId: celoSepolia.id })}
            disabled={isSwitching}
            // Hover sutil para el botón de alerta (se oscurece un poco el amarillo)
            className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-yellow-600 enabled:hover:scale-105"
            >
            {isSwitching ? "Cambiando..." : "Cambiar a Celo Sepolia"}
            </button>
        )}

        {/* Badge de la dirección de la Wallet (No es un botón, pero se ve genial) */}
        <div className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm">
            {shortenAddress(address)} · Chain {chainId}
        </div>

        {/* Botón de Desconectar (Salir) */}
        <button
            onClick={() => disconnect()}
            // Efecto minimalista: se vuelve rojo/borde rojo al querer salir
            className="rounded-xl border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
        >
            Salir
        </button>
        </div>
    );
}