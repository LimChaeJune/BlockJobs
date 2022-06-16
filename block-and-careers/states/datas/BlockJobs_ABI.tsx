export const Contract_Address = "0x5e749D8b6B3e1CcE83a2eFDf6aB88BBb9d2533d5";
export const BlockJobs_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_careerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_status",
        type: "uint256",
      },
    ],
    name: "approveCareer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_tokenContractAddress",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_nftContractAddress",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Bought",
    type: "event",
  },
  {
    inputs: [],
    name: "Buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Sold",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "careerId",
        type: "uint256",
      },
    ],
    name: "approveCareer_event",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenOwner",
        type: "address",
      },
    ],
    name: "approveForNFT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approveUser",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_role",
        type: "string[]",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "address",
        name: "_company",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_stDt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fnsDt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "createCareer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "writer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "careerId",
        type: "uint256",
      },
    ],
    name: "createCareer_event",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_content",
        type: "string",
      },
      {
        internalType: "address",
        name: "_company",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "createDt",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_nftUri",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "createReview",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_reviewId",
        type: "uint256",
      },
    ],
    name: "mintNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sell",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amout",
        type: "uint256",
      },
    ],
    name: "transferFrom_event",
    type: "event",
  },
  {
    inputs: [],
    name: "_deployAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
    ],
    name: "BalanceOf",
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
    inputs: [],
    name: "BlockJobCoinAddress",
    outputs: [
      {
        internalType: "contract BlockJobsCoin",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BlockJobsNftAddress",
    outputs: [
      {
        internalType: "contract BlockJobsNft",
        name: "",
        type: "address",
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
    name: "Career_mapping",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "address",
        name: "worker",
        type: "address",
      },
      {
        internalType: "address",
        name: "company",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "stDt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fnsDt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "CareerByCompany_mapping",
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "CareerByWorker_mapping",
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
    inputs: [],
    name: "CareerTotalSupply",
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
        internalType: "address",
        name: "_company",
        type: "address",
      },
    ],
    name: "getCareerByCompany",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string[]",
            name: "roles",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "address",
            name: "worker",
            type: "address",
          },
          {
            internalType: "address",
            name: "company",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "stDt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fnsDt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256",
          },
        ],
        internalType: "struct CareerContract.Career[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_worker",
        type: "address",
      },
    ],
    name: "getCareerByWorker",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string[]",
            name: "roles",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "address",
            name: "worker",
            type: "address",
          },
          {
            internalType: "address",
            name: "company",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "stDt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fnsDt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256",
          },
        ],
        internalType: "struct CareerContract.Career[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_careerId",
        type: "uint256",
      },
    ],
    name: "getCareerDetail",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
    inputs: [],
    name: "GetEther",
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
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "getNftBalanceOf",
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
        name: "_nftId",
        type: "uint256",
      },
    ],
    name: "getNftOwnerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nftId",
        type: "uint256",
      },
    ],
    name: "getNftTokenUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_company",
        type: "address",
      },
    ],
    name: "getReviewByCompany",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "content",
            type: "string",
          },
          {
            internalType: "address",
            name: "company",
            type: "address",
          },
          {
            internalType: "address",
            name: "writer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "createDt",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "nftUri",
            type: "string",
          },
        ],
        internalType: "struct CareerContract.Review[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_writer",
        type: "address",
      },
    ],
    name: "getReviewByWriter",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "content",
            type: "string",
          },
          {
            internalType: "address",
            name: "company",
            type: "address",
          },
          {
            internalType: "address",
            name: "writer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "createDt",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "nftUri",
            type: "string",
          },
        ],
        internalType: "struct CareerContract.Review[]",
        name: "",
        type: "tuple[]",
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
    name: "Review_mapping",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "address",
        name: "company",
        type: "address",
      },
      {
        internalType: "address",
        name: "writer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "createDt",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "nftUri",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ReviewByCompany_mapping",
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ReviewByWriter_mapping",
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
    inputs: [],
    name: "ReviewTotalSupply",
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
];
