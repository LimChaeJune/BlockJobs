import { useRecoilState } from "recoil";

import { AccountUserType, Account_Model } from "@restapi/types/account";
import { EnterPrise_Entity } from "@restapi/types/enterprise";

import { account_state } from "@state/web3/account";
import { getEnterSelector } from "@state/enterprise";

import { useBlockJobs } from "@hooks/BlockJobsContract";
import { Flex, Heading, Text, Box, Spacer, Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import {
  Profile_Box,
  Profile_Info,
} from "@components/users/profile/Profile_Box";
import ProfileLayout from "@components/layouts/profilelayout";
import CenterLayout from "@components/layouts/centerlayout";
import { Review_Item } from "@restapi/types/review";
import colors from "themes/foundations/colors";
import html2canvas from "html2canvas";
import { useIpfs } from "@hooks/Ipfsupload";
import { useContractModal } from "@hooks/ContractModalHook";
import LoadingModal from "@components/utils/loadingModal";
import { useUserLogin } from "@hooks/LoginCheck";
import Link from "next/link";
import opensea from "../../../public/images/opensea.png";
import Image from "next/image";

const ReviewList = () => {
  const [accountstate] = useRecoilState<Account_Model | null>(account_state);
  // 현재 보여주고 있는 경력 카운터
  const [currCnt, setCurrCnt] = useState<number>(4);
  // 컨트랙트로 등록된 경력
  const [reviewes, setReviewes] = useState<Review_Item[]>([]);

  // IPFS Hook
  const { dataURItoBlob, UploadIpfs, infura } = useIpfs();
  // Contract Hook
  const { getReviewByWriter, mintNft, contractState } = useBlockJobs();

  const {
    isReject,
    isSignWait,
    receiptLink,
    description,
    isOpen,
    SignOpen,
    RejectOpen,
    SuccessOpen,
    onClose,
  } = useContractModal();

  // 컨트랙트로 등록된 경력 조회
  const getContractReview = useCallback(async () => {
    const value: Review_Item[] = await getReviewByWriter(
      accountstate?.accountAddress
    );
    setReviewes(value);
  }, [setReviewes, accountstate?.accountAddress, getReviewByWriter]);

  const { IsCustomer } = useUserLogin();
  // 로그인 확인
  useEffect(() => {
    IsCustomer();
  }, []);

  // NFT 민팅
  const Minting_Click = async (
    reviewId: number,
    reviewName: string,
    description: string
  ) => {
    const reviewBox = document.getElementById(`review-${reviewId}`);
    if (reviewBox) {
      await html2canvas(reviewBox).then(async (canvas) => {
        await UploadIpfs(
          dataURItoBlob(canvas.toDataURL("image/png")),
          reviewName,
          description
        ).then(async (imgUrl) => {
          console.log(imgUrl);
          if (accountstate?.accountAddress) {
            await SignOpen(`${reviewId}번 리뷰 nft 발행`);
            await mintNft({
              owner: accountstate?.accountAddress,
              tokenURI: infura + imgUrl,
              reviewId: reviewId,
            })
              .then(async (receipt) => {
                await SuccessOpen(receipt.transactionHash);
                await getContractReview();
              })
              .catch(async (error) => {
                await RejectOpen(error);
              });
          }
        });
      });
    }
  };

  useEffect(() => {
    // DB에 등록된 경력
    getContractReview();
  }, [accountstate?.accountAddress, contractState, getContractReview]);

  return (
    <CenterLayout>
      <ProfileLayout
        title="경력 현황"
        usertype={AccountUserType.Customer}
        navbartitle={`${accountstate?.user?.name}님`}
      >
        <Box>
          <Profile_Box boxTitle="내가 작성한 리뷰">
            <Flex gap={5} direction={"column"}>
              {reviewes?.length > 0 ? (
                reviewes
                  ?.slice()
                  .sort((a, b) => b.id - a.id)
                  .slice(0, currCnt)
                  ?.map((item, idx) => {
                    return (
                      <Review_Box
                        key={idx}
                        review={item}
                        mintingClick={Minting_Click}
                      />
                    );
                  })
              ) : (
                <Heading textAlign={"center"} fontSize={"xl"}>
                  아직 작성한 리뷰가 없습니다.
                  <br />
                  내가 증명받은 기업에 리뷰 작성해 토큰을 보상으로 받아보아요😄
                </Heading>
              )}
            </Flex>
            {currCnt < reviewes?.length ? (
              <Box
                textAlign={"center"}
                fontSize={"xl"}
                cursor={"pointer"}
                mt={"10px"}
                fontWeight={"bold"}
                onClick={() => setCurrCnt(currCnt + 4)}
              >
                + 더보기
              </Box>
            ) : null}
          </Profile_Box>
        </Box>
        <LoadingModal
          isOpen={isOpen}
          onClose={onClose}
          reciptLink={receiptLink}
          description={description}
          isReject={isReject}
          isSignWait={isSignWait}
        />
      </ProfileLayout>
    </CenterLayout>
  );
};

interface contract_review_props {
  review: Review_Item;
  mintingClick: (
    reviewId: number,
    reviewName: string,
    description: string
  ) => void;
}

const Review_Box = ({ review, mintingClick }: contract_review_props) => {
  const [enter] = useRecoilState<EnterPrise_Entity[]>(getEnterSelector);
  return (
    <>
      <Box
        id={`review-${review.id}`}
        border={"1px solid gray"}
        boxShadow={"xl"}
        borderRadius={"md"}
        padding={5}
      >
        <Box float={"right"}>
          {review.nftUri ? (
            <Link
              href={`https://testnets.opensea.io/assets/rinkeby/0xd6310a71d1241970e0a61041c124d663fd24822f/${review.id}`}
              passHref
            >
              <a target="_blank" rel="noopener noreferrer">
                <Flex alignItems={"center"} gap={"5px"} cursor={"pointer"}>
                  <Image
                    src={opensea}
                    alt="opensea"
                    width={"30px"}
                    height={"30px"}
                  />
                  <Text
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    color={colors.blue[400]}
                  >
                    OpenSea에서 내 NFT 보기
                  </Text>
                </Flex>
              </a>
            </Link>
          ) : (
            <Button
              onClick={() =>
                mintingClick(review.id, review.title, review.content)
              }
            >
              NFT 발행
            </Button>
          )}
        </Box>
        <Flex>
          <Box>
            <Heading fontSize={"small"} mb={2}>
              {`${
                enter?.find((e) => e.account.accountAddress === review.company)
                  ?.title ?? "회원등록 되지 않은 주소"
              } (${review.company})`}
            </Heading>
          </Box>
          <Spacer />
        </Flex>
        <Profile_Info title="제목">
          <Heading fontSize={"sm"}>{`${review.title}`}</Heading>
        </Profile_Info>
        <Profile_Info title="내용">
          <Text
            whiteSpace={"pre-line"}
            fontSize={"md"}
          >{`${review.content}`}</Text>
        </Profile_Info>
        <Profile_Info title="작성일자">
          <Text color={colors.secondery[400]} fontSize={"md"}>{`${new Date(
            review.createDt.toNumber()
          ).toLocaleDateString()}`}</Text>
        </Profile_Info>
      </Box>
    </>
  );
};

export default ReviewList;
