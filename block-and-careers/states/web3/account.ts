import { ethers } from "ethers";
import { atom } from "recoil";

export interface Web3_Model {
  provider: string;
  web3Provider: ethers.providers.Web3Provider | null | undefined;
  address: string | null | undefined;
  network: ethers.providers.Network | null | undefined;
}

// 처음 Web3 연결 전 초기화
export const initialWeb3 = atom<Web3_Model>({
    key: "web3_init",

    default:{
        provider: "",
        web3Provider:null,
        network: null,
        address: null
    }    
});

