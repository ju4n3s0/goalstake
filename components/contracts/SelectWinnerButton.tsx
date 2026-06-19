"use client";

import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CHALLENGE_ESCROW_ABI, CHALLENGE_ESCROW_ADDRESS } from "../../lib/contracts";
import { celoSepolia } from "../../lib/wagmi";

export function SelectWinnerButton() {
  const [winner, setWinner] = useState("");
  const { address, isConnected } = useAccount();

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  function handleSelectWinner() {
    if (!isConnected || !address) {
      alert("Primero conecta tu wallet");
      return;
    }

    writeContract({
      address: CHALLENGE_ESCROW_ADDRESS,
      abi: CHALLENGE_ESCROW_ABI,
      functionName: "selectWinner",
      args: [1n, winner as `0x${string}`],
      account: address,
      chain: celoSepolia,
    });
  }

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">Seleccionar ganador</h2>

      <input
        value={winner}
        onChange={(e) => setWinner(e.target.value)}
        placeholder="Wallet ganadora"
        className="mt-4 w-full rounded-xl border px-4 py-2 text-sm"
      />

      <button
        onClick={handleSelectWinner}
        disabled={isPending || isConfirming || !winner}
        className="mt-4 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isPending
          ? "Esperando wallet..."
          : isConfirming
          ? "Confirmando..."
          : "Seleccionar ganador"}
      </button>

      {hash && <p className="mt-3 break-all text-xs text-gray-500">Tx: {hash}</p>}
      {isSuccess && <p className="mt-3 text-sm text-green-600">Ganador seleccionado.</p>}
      {error && <p className="mt-3 text-sm text-red-600">Error: {error.message}</p>}
    </div>
  );
}