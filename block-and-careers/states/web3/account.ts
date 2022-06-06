import axios from "axios";
import { ethers } from "ethers";
import { atom, selector } from "recoil";
import { Account_Model } from "restapi/types/account";

export interface Web3_Model {
  address: string | null | undefined;
  network: ethers.providers.Network | null | undefined;
}

// 처음 Web3 연결 전 초기화
export const initialWeb3 = atom<Web3_Model>({
  key: "blockjob_web3",

  default: {
    network: null,
    address: null,
  },

  // dangerouslyAllowMutability: true,
});

// 처음 Web3 연결 전 초기화
export const account_state = atom<Account_Model | null>({
  key: "curr_account",

  default: null,
  // dangerouslyAllowMutability: true,
});

export const balance = atom<string | undefined>({
  key: "blockjob_balance",

  default: undefined,
  // dangerouslyAllowMutability: true,
});
