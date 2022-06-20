import { BigNumber, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useWeb3 } from "./Web3Client";
import { CareerStatus, Career_Item } from "@restapi/types/career";
import { Review_Item } from "@restapi/types/review";
interface props_createCareer {
  myRoles: string[];
  description: string;
  company_address: string | undefined;
  stDt: Date;
  fnsDt: Date;
}

interface props_createReview {
  title: string;
  content: string;
  company: string | undefined;
  createDt: Date;
  nftUri: string;
}

interface approve_Career {
  careerId: number;
  status: CareerStatus;
}

interface mintNft {
  owner: string;
  tokenURI: string;
  reviewId: number;
}

export const useBlockJobs = () => {
  const reviewCreateAmount = 5;
  const careerCreateAmount = 10;
  const { connect } = useWeb3();
  const [contractState, setContract] = useState<ethers.Contract>();

  useEffect(() => {
    const fetchAsync = async () => {
      const contract = await connect();
      await setContract(contract);
    };
    fetchAsync();
  }, []);

  // User의 Amount만큼 approve
  const approveUser = useCallback(
    async (amount: number) => {
      const tx = await contractState?.approveUser(amount);
      const receipt = await tx.wait();
      return receipt;
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
    async (amount: string) => {
      const tx = await contractState?.Buy({
        value: ethers.utils.parseEther(amount),
      });
      const receipt = await tx.wait();
      return receipt;
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

      return receipt;
    },
    [contractState]
  );

  // 리뷰 작성
  const createReview = useCallback(
    async ({
      title,
      content,
      company,
      createDt,
      nftUri,
    }: props_createReview) => {
      const tx = await contractState?.createReview(
        title,
        content,
        company,
        new Date(createDt).getTime(),
        nftUri,
        reviewCreateAmount
      );
      const receipt = await tx.wait();
      return receipt;
    },
    [contractState]
  );

  // 경력 신청
  const createCareer = useCallback(
    async ({
      myRoles,
      description,
      company_address,
      stDt,
      fnsDt,
    }: props_createCareer) => {
      const tx = await contractState?.createCareer(
        myRoles,
        description,
        company_address,
        new Date(stDt).getTime(),
        new Date(fnsDt).getTime(),
        careerCreateAmount
      );
      const receipt = await tx.wait();
      return receipt;
    },
    [contractState]
  );

  // 경력 증명
  const approveCareer = useCallback(
    async ({ careerId, status }: approve_Career) => {
      try {
        const tx = await contractState?.approveCareer(
          careerId,
          careerCreateAmount,
          status
        );
        const receipt = await tx.wait();
        return receipt;
      } catch (e) {
        console.log(e);
      }
    },
    [contractState]
  );

  // NFT 민팅
  const mintNft = useCallback(
    async ({ owner, tokenURI, reviewId }: mintNft) => {
      try {
        const tx = await contractState?.mintNft(owner, tokenURI, reviewId);
        const receipt = await tx.wait();
        return receipt;
      } catch (e) {
        console.log(e);
      }
    },
    [contractState]
  );

  // 회사의 지갑주소 기준으로 리뷰 조회
  const getReviewByCompany = useCallback(
    async (enterprise_address: string | undefined): Promise<Review_Item[]> => {
      const reviewByCompany = await contractState?.getReviewByCompany(
        enterprise_address
      );
      return reviewByCompany;
    },
    [contractState]
  );

  // 작성자 지갑주소 기준으로 리뷰 조회
  const getReviewByWriter = useCallback(
    async (user_address: string | undefined): Promise<Review_Item[]> => {
      const reviewByWriter = await contractState?.getReviewByWriter(
        user_address
      );
      return reviewByWriter;
    },
    [contractState]
  );

  // 회사의 지갑주소 기준으로 커리어 조회
  const getCareerByCompany = useCallback(
    async (enterprise_address: string | undefined): Promise<Career_Item[]> => {
      const careersByCompany = await contractState?.getCareerByCompany(
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
    createReview,
    createCareer,
    approveCareer,
    getCareerByCompany,
    getCareerByWorker,
    getReviewByCompany,
    getReviewByWriter,
    getCareerDetail,
    mintNft,
    contractState,
  };
};
