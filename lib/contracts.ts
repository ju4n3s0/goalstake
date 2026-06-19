export const CHALLENGE_ESCROW_ADDRESS =
  "0xcc37cb5dba0d3423b271fbad370c997eea4f2915" as const;

export const CHALLENGE_ESCROW_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "challengeCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "challenges",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "title", type: "string" },
      { internalType: "uint256", name: "entryFee", type: "uint256" },
      { internalType: "uint256", name: "totalPool", type: "uint256" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "bool", name: "active", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_title", type: "string" },
      { internalType: "uint256", name: "_entryFee", type: "uint256" },
    ],
    name: "createChallenge",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "joinChallenge",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },

  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "joined",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  
] as const;