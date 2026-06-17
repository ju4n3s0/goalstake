import { network } from "hardhat";

const { viem } = await network.connect({
  network: "celoSepolia",
});

const challengeEscrow = await viem.deployContract("ChallengeEscrow");

console.log("ChallengeEscrow deployed to:", challengeEscrow.address);