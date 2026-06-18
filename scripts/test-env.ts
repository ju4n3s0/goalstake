import "dotenv/config";

console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY ? "EXISTS" : "MISSING");
console.log("RPC:", process.env.CELO_SEPOLIA_RPC_URL);