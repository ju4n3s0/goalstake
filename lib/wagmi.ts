// src/lib/wagmi.ts

import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { defineChain } from "viem";

export const celoSepolia = defineChain({
    id: 11142220,
    name: "Celo Sepolia",
    nativeCurrency: {
        name: "CELO",
        symbol: "CELO",
        decimals: 18,
    },
    rpcUrls: {
        default: {
        http: ["https://forno.celo-sepolia.celo-testnet.org"],
        },
    },
    blockExplorers: {
        default: {
        name: "Celo Sepolia Blockscout",
        url: "https://celo-sepolia.blockscout.com",
        },
    },
    testnet: true,
});

export const wagmiConfig = createConfig({
    chains: [celoSepolia],
    connectors: [injected()],
    transports: {
        [celoSepolia.id]: http("https://forno.celo-sepolia.celo-testnet.org"),
    },
});