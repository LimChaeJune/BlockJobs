import { ethers } from "ethers";
import { atom } from "recoil";

export interface Web3_Model {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any ;
  web3Provider: ethers.providers.Web3Provider | null | undefined;
  address: string | null | undefined;
  network: ethers.providers.Network | null | undefined;
}

// 처음 Web3 연결 전 초기화
export const initialWeb3 = atom<Web3_Model>({
  key: "blockjob_web3",

  default: {
    provider: null,
    web3Provider: null,
    network: null,
    address: null,
  },
});
