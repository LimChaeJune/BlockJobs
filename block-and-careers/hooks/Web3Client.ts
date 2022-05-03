import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";
import { initialWeb3 } from "@state/web3/account";
import { Web3_Model } from "@state/web3/account";
import { toast } from "react-toastify";

console.log(process.env.INFURA_PUBLIC_ID);

const providerOptions = {
  walletconnection: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.INFURA_PUBLIC_ID,
    },
  },
};

let web3Modal: Web3Modal | null;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "rinkeby", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

export const useWeb3 = () => {
  const [web3State, SetWeb3] = useRecoilState<Web3_Model>(initialWeb3);

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        toast.success("지갑연결에 성공했습니다.");

        const ConnWeb3: Web3_Model = {
          provider: provider,
          web3Provider: web3Provider,
          address: address,
          network: network,
        };

        SetWeb3(ConnWeb3);
      } catch (e) {
        console.log("web3 connection error", e);
      }
    } else {
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (web3State?.provider) {
        await web3State.provider.disconnect();
      }

      toast.success("지갑 연결을 해지했습니다.");

      const DisConn: Web3_Model = {
        provider: null,
        web3Provider: null,
        address: null,
        network: null,
      };

      SetWeb3(DisConn);
    } else {
      console.error("No Web3Modal");
    }
  }, []);

  useEffect(() => {
    if (web3State?.provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        toast.info("지갑이 변경되었습니다.");

        SetWeb3({ ...web3State, address: accounts[0] });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== "undefined") {
          console.log("switched to chain...", _hexChainId);
          toast.info("Web3 네트워크가 변경되었습니다.");
          window.location.reload();
        } else {
          console.log("window is undefined");
        }
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      web3State.provider.on("accountsChanged", handleAccountsChanged);
      web3State.provider.on("chainChanged", handleChainChanged);
      web3State.provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (web3State.provider.removeListener) {
          web3State.provider.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          web3State.provider.removeListener("chainChanged", handleChainChanged);
          web3State.provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [web3State.provider, disconnect]);

  return {
    connect,
    disconnect,
  };
};
