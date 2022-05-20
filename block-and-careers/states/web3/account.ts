import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { atom, selector } from "recoil";

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

export const balance = atom<BigNumber | 0>({
  key: "blockjob_balance",

  default: 0,
  // dangerouslyAllowMutability: true,
});

export const getAccountExist = selector<boolean>({
  key: "getAccountExist",
  get: async ({ get }) => {
    const address = get(initialWeb3)?.address;
    if (address) {
      const res = await axios.get(
        `http://localhost:5001/account/CheckAccount/${address}`
      );
      return res.data;
    }
    return false;
  },
});
