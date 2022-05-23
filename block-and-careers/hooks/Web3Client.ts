import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";
import { initialWeb3 } from "@state/web3/account";
import { Web3_Model } from "@state/web3/account";
import { useToast } from "@chakra-ui/react";
import { BlockJobs_ABI, Contract_Address } from "@state/datas/BlockJobs_ABI";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.INFURA_PUBLIC_ID,
    },
  },
};

let web3Modal: Web3Modal | null;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "Ropsten", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

export const useWeb3 = () => {
  const toast = useToast();
  const [web3State, SetWeb3] = useRecoilState<Web3_Model>(initialWeb3);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalProvider, SetModalProvider] = useState<any>(null);
  const [web3Provider, SetWeb3Provider] =
    useState<ethers.providers.Web3Provider | null>(null);

  const [ContractState, SetContractState] = useState<ethers.Contract>();

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider?.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider?.getNetwork();

        toast({
          title: "지갑연결에 성공했습니다.",
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });

        const ConnWeb3: Web3_Model = {
          address: address,
          network: network,
          signer: signer,
        };

        const Contract = new ethers.Contract(
          Contract_Address,
          BlockJobs_ABI,
          signer
        );

        SetContractState(Contract);
        SetModalProvider(provider);
        SetWeb3Provider(web3Provider);
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
      if (modalProvider) {
        await modalProvider.disconnect();
      }

      toast({
        title: "지갑연결을 해지하였습니다..",
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });

      const DisConn: Web3_Model = {
        address: null,
        network: null,
        signer: undefined,
      };
      SetWeb3(DisConn);
    } else {
      console.error("No Web3Modal");
    }
  }, []);

  const getContract = () => {
    const Contract = new ethers.Contract(
      Contract_Address,
      BlockJobs_ABI,
      web3State.signer
    );

    return Contract;
  };

  useEffect(() => {
    if (modalProvider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        toast({
          title: "지갑이 변경되었습니다.",
          status: "info",
          position: "bottom-right",
          isClosable: true,
        });

        SetWeb3({ ...web3State, address: accounts[0] });
      };

      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== "undefined") {
          console.log("switched to chain...", _hexChainId);
          toast({
            title: "Web3 네트워크가 변경되었습니다.",
            status: "info",
            position: "bottom-right",
            isClosable: true,
          });
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

      modalProvider.on("accountsChanged", handleAccountsChanged);
      modalProvider.on("chainChanged", handleChainChanged);
      modalProvider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (modalProvider.removeListener) {
          modalProvider.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          modalProvider.removeListener("chainChanged", handleChainChanged);
          modalProvider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [web3Provider, disconnect]);

  return {
    connect,
    disconnect,
    getContract,
    ContractState,
  };
};
