import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRecoilState, useSetRecoilState } from "recoil";
import { account_state, balance, initialWeb3 } from "@state/web3/account";
import { Web3_Model } from "@state/web3/account";
import { useToast } from "@chakra-ui/react";
import { BlockJobs_ABI, Contract_Address } from "@state/datas/BlockJobs_ABI";
import { Account_Model } from "@restapi/types/account";
import { accountCheck } from "@restapi/account/get";
import { newIdState } from "@state/user";
import { useRouter } from "next/router";
import { main_page } from "@components/utils/routing";

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
    network: "rinkeby", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

export const useWeb3 = () => {
  const toast = useToast();
  const router = useRouter();

  // 등록된 회원인지
  const [isnew, setisNewId] = useRecoilState<boolean>(newIdState);
  // 컨트랙트 상태
  const [contractState, SetContract] = useState<ethers.Contract | undefined>();
  // Web3 정보
  const [web3State, SetWeb3] = useRecoilState<Web3_Model>(initialWeb3);
  // 지갑 상태
  const [existAccountState, setExistAccount] =
    useRecoilState<Account_Model | null>(account_state);
  // 지갑 BJC 코인 Balance
  const setBalance = useSetRecoilState<string | undefined>(balance);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalProvider, SetModalProvider] = useState<any>(null);
  const [web3Provider, SetWeb3Provider] =
    useState<ethers.providers.Web3Provider | null>(null);

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider?.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider?.getNetwork();

        const sessionCheck = sessionStorage.getItem("account");
        if (localStorage.getItem("injected") && !sessionCheck) {
          console.log(sessionCheck);
          toast({
            title: "지갑연결에 성공했습니다.",
            status: "success",
            position: "bottom-right",
            isClosable: true,
          });
        }

        const ConnWeb3: Web3_Model = {
          address: address,
          network: network,
        };

        const Contract = new ethers.Contract(
          Contract_Address,
          BlockJobs_ABI,
          signer
        );

        SetModalProvider(provider);
        SetWeb3Provider(web3Provider);
        SetWeb3(ConnWeb3);

        if (web3Modal) {
          setBalance(
            ethers.utils.formatEther(
              await Contract?.BalanceOf(ConnWeb3?.address)
            )
          );
        }

        await setAccountExist();

        return Contract;
      } catch (e) {
        console.log("web3 connection error", e);
      }
    } else {
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      // if (modalProvider) {
      //   await modalProvider.disconnect();
      // }
      await logoutAccountExist();

      toast({
        title: "지갑연결을 해지하였습니다..",
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });

      const DisConn: Web3_Model = {
        address: null,
        network: null,
      };
      SetWeb3(DisConn);
      router.push(main_page);
    } else {
      console.error("No Web3Modal");
    }
  }, []);

  const logoutAccountExist = async () => {
    await setExistAccount(null);
    sessionStorage.removeItem("account");
  };

  const setAccountExist = async () => {
    if (web3State?.address) {
      await accountCheck(web3State.address)
        .then((res) => {
          if (!res.data) {
            setisNewId(false);
          }
          setExistAccount(res.data);
          console.log(res);
          sessionStorage.setItem("account", JSON.stringify(res.data));
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  useEffect(() => {
    console.log(isnew);
    const effectaction = async () => {
      if (web3State?.address) {
        await accountCheck(web3State.address)
          .then((res) => {
            setExistAccount(res.data);
            console.log(res);
            sessionStorage.setItem("account", JSON.stringify(res.data));
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    };
    effectaction();
  }, [isnew]);

  useEffect(() => {
    setAccountExist();
  }, [web3State]);

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

        router.push("/");
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
    setAccountExist,
    contractState,
  };
};
