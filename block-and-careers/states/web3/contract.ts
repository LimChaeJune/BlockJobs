import { ethers } from "ethers";
import { atom } from "recoil";

export const contract_state = atom<ethers.Contract | null>({
  key: "contractState",

  default: null,
  // dangerouslyAllowMutability: true,
});
