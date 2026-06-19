import { network } from "hardhat";

const { viem } = await network.connect({
  network: "celoSepolia",
});

const challengeEscrow = await viem.deployContract("ChallengeEscrow");

console.log("ChallengeEscrow V2 deployed to:", challengeEscrow.address);