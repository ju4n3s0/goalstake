import "dotenv/config";
import { privateKeyToAccount } from "viem/accounts";

const rawPrivateKey = process.env.PRIVATE_KEY;

if (!rawPrivateKey) {
  throw new Error("PRIVATE_KEY missing");
}

const privateKey = rawPrivateKey.startsWith("0x")
  ? rawPrivateKey
  : `0x${rawPrivateKey}`;

const account = privateKeyToAccount(privateKey as `0x${string}`);

console.log("Address:", account.address);