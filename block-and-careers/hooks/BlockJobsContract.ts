import { BigNumber, ethers } from "ethers";
import { useCallback, useEffect } from "react";
import { useWeb3 } from "./Web3Client";

interface props_createCareer {
  myRoles: string[];
  description: string;
  company_address: string | undefined;
  stDt: Date;
  fnsDt: Date;
}

export const useBlockJobs = () => {
  const { connect, contractState } = useWeb3();

  useEffect(() => {
    const fetchAsync = async () => {
      await connect();
    };
    fetchAsync();
  }, []);

  // User의 Amount만큼 approve
  const approveUser = useCallback(
    async (amount: string) => {
      const tx = await contractState?.approveUser(
        ethers.utils.parseEther(amount)
      );
      const receipt = await tx.wait();
      const data = receipt.logs[0].data;
      console.log(data);
    },
    [contractState]
  );

  // JJC 코인 조회
  const BalanceOf = useCallback(
    async (address: string | null | undefined): Promise<BigNumber> => {
      const balance = await contractState?.BalanceOf(address);
      return balance;
    },
    [contractState]
  );

  // Ether로 BJC 구매
  const Buy = useCallback(
    async (amount: string) => {
      const tx = await contractState?.Buy({
        value: ethers.utils.parseEther(amount),
      });
      const receipt = await tx.wait();
      const data = receipt.logs[0].data;
      console.log(data);
    },
    [contractState]
  );

  const createCareer = useCallback(
    async ({
      myRoles,
      description,
      company_address,
      stDt,
      fnsDt,
    }: props_createCareer) => {
      try {
        const tx = await contractState?.createCareer(
          myRoles,
          description,
          company_address,
          new Date(stDt).getTime(),
          new Date(fnsDt).getTime(),
          ethers.utils.parseEther("1")
        );
        const receipt = await tx.wait();
        const data = receipt.logs[0].data;
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
    [contractState]
  );

  return { approveUser, BalanceOf, Buy, createCareer };
};
