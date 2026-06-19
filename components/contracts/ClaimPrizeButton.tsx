// components/contracts/ClaimPrizeButton.tsx
"use client";

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import {
  CHALLENGE_ESCROW_ABI,
  CHALLENGE_ESCROW_ADDRESS,
} from "../../lib/contracts";
import { celoSepolia } from "../../lib/wagmi";

export function ClaimPrizeButton() {
  const { address, isConnected } = useAccount();

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  function handleClaimPrize() {
    if (!isConnected || !address) {
      alert("Primero conecta tu wallet");
      return;
    }

    writeContract({
      address: CHALLENGE_ESCROW_ADDRESS,
      abi: CHALLENGE_ESCROW_ABI,
      functionName: "claimPrize",
      args: [1n],
      account: address,
      chain: celoSepolia,
    });
  }

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">Reclamar premio</h2>

      <button
        onClick={handleClaimPrize}
        disabled={isPending || isConfirming}
        className="mt-4 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isPending
          ? "Esperando wallet..."
          : isConfirming
          ? "Confirmando..."
          : "Reclamar premio"}
      </button>

      {hash && <p className="mt-3 break-all text-xs text-gray-500">Tx: {hash}</p>}

      {isSuccess && (
        <p className="mt-3 text-sm font-semibold text-green-600">
          Premio reclamado correctamente.
        </p>
      )}

      {error && <p className="mt-3 text-sm text-red-600">Error: {error.message}</p>}
    </div>
  );
}
