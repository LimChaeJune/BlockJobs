import { BigNumber } from "ethers";
import { useCallback, useEffect } from "react";
import { useWeb3 } from "./Web3Client";
import { CareerStatus, Career_Item } from "@restapi/types/career";
interface props_createCareer {
  myRoles: string[];
  description: string;
  company_address: string | undefined;
  stDt: Date;
  fnsDt: Date;
}

interface approve_Career {
  careerId: string;
  amount: number;
  status: CareerStatus;
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
    async (amount: number) => {
      const tx = await contractState?.approveUser(amount);
      const receipt = await tx.wait();
      const data = receipt.logs[0].data;
      console.log(data);
    },
    [contractState]
  );

  // to_address에게 amount만큼 송금
  const transferFrom = useCallback(
    async (to_address: string, amount: number) => {
      await contractState?.transferFrom(to_address, amount);
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
    async (amount: number) => {
      const tx = await contractState?.Buy({
        value: amount,
      });
      const receipt = await tx.wait();
      const data = receipt.logs[0].data;
      console.log(data);
    },
    [contractState]
  );

  // BJC로 Ether 구매
  const Sell = useCallback(
    async (amount: number) => {
      const tx = await contractState?.sell({
        value: amount,
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
          10
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

  const approveCareer = useCallback(
    async ({ careerId, amount, status }: approve_Career) => {
      try {
        const tx = await contractState?.approveCareer(careerId, amount, status);
        const receipt = await tx.wait();
        const data = receipt.logs[0].data;
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  // 회사의 지갑주소 기준으로 커리어 조회
  const getCareerByComany = useCallback(
    async (enterprise_address: string): Promise<Career_Item[]> => {
      const careersByCompany = await contractState?.getCareerByComany(
        enterprise_address
      );
      return careersByCompany;
    },
    [contractState]
  );

  // 신청인 지갑주소 기준으로 커리어 조회
  const getCareerByWorker = useCallback(
    async (user_address: string | undefined): Promise<Career_Item[]> => {
      if (user_address === undefined) {
        return [];
      }

      const careerByWorker = await contractState?.getCareerByWorker(
        user_address
      );
      return careerByWorker;
    },
    [contractState]
  );

  // 아이디 기준으로 커리어 조회
  const getCareerDetail = useCallback(
    async (careerId: number): Promise<Career_Item> => {
      const careerById = await contractState?.getCareerDetail(careerId);
      return careerById;
    },
    [contractState]
  );

  return {
    approveUser,
    transferFrom,
    BalanceOf,
    Buy,
    Sell,
    createCareer,
    approveCareer,
    getCareerByComany,
    getCareerByWorker,
    getCareerDetail,
  };
};
