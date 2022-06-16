import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stack,
  Input,
  Button,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import ReviewPostPopup from "@components/enterprise/reviewPostPopup";
import CenterLayout from "@components/layouts/centerlayout";
import { useBlockJobs } from "@hooks/BlockJobsContract";
import { GetEnterPriseById } from "@restapi/enterprise/get";
import { CareerStatus, Career_Item } from "@restapi/types/career";
import { EnterPrise_Entity } from "@restapi/types/enterprise";
import { Review_Item } from "@restapi/types/review";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import colors from "themes/foundations/colors";
import opensea from "../../public/images/opensea.png";
import NextImage from "next/image";

const CompanyDetail = () => {
  const { getCareerByCompany, getReviewByCompany, contractState } =
    useBlockJobs();
  // 기업 상세 정보
  const [enterprise, setEnterprise] = useState<EnterPrise_Entity>();
  // 컨트랙트 상 경력
  const [contractCareer, setCareer] = useState<Career_Item[]>([]);
  // 컨트랙트 리뷰 목록
  const [contractReview, setReviews] = useState<Review_Item[]>([]);

  const router = useRouter();

  const { onClose, isOpen, onOpen } = useDisclosure();

  // 컨트랙트로 등록된 경력 조회
  const getContractCareer = async () => {
    if (enterprise?.account) {
      const value: Career_Item[] = await getCareerByCompany(
        enterprise?.account?.accountAddress
      );
      setCareer(value);
    }
  };

  // 컨트랙트로 등록된 리뷰 조회
  const getContractReview = async () => {
    if (enterprise?.account) {
      const value: Review_Item[] = await getReviewByCompany(
        enterprise?.account?.accountAddress
      );
      setReviews(value);
    }
  };

  // 리뷰 생성 후 리뷰 목록 재조회
  const CompleteReviewCreate = async () => {
    await getContractReview();
  };

  useEffect(() => {
    const routeId = router.query.enterpriseId;
    const fetchAction = async () => {
      if (routeId) {
        await GetEnterPriseById(routeId).then(async (res) => {
          await setEnterprise(res.data);
        });
      }
    };
    fetchAction();
  }, [router]);

  useEffect(() => {
    const fetchAction = async () => {
      await getContractCareer();
      await getContractReview();
    };
    fetchAction();
  }, [enterprise, contractState]);

  return (
    <CenterLayout>
      <Box bg={"white"}>
        <Image w={"100%"} maxHeight="400px" src={enterprise?.thumbnail} />
        <Box pl={5} pr={5}>
          <Box mt={5}>
            <Heading>{enterprise?.title}</Heading>
            <Flex mt={1}>
              <Badge
                ml="1"
                fontSize="0.9em"
                colorScheme={"blue"}
                borderRadius={"full"}
                padding={"5px 10px 5px 10px"}
              >
                {enterprise?.employees}
              </Badge>
            </Flex>
          </Box>
          <Center height="50px">
            <Divider />
          </Center>
          <Box>
            <Heading fontSize={"xl"}>기업 소개</Heading>
            <Text mt={3}>{enterprise?.description}</Text>
          </Box>

          <Tabs isFitted variant="enclosed" mt={"30px"}>
            <TabList mb="1em">
              <Tab>기업이 검증한 경력</Tab>
              <Tab>기업 리뷰</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex>
                  <Heading fontSize={"3xl"} mb={"10px"}>{`${
                    contractCareer?.length ?? 0
                  }개의 경력`}</Heading>
                </Flex>
                {contractCareer?.length === 0 ? (
                  <Heading color={"black"} fontSize={"xl"} textAlign={"center"}>
                    <Divider mb={5} />
                    아직 신청받은 경력이 없습니다.
                  </Heading>
                ) : (
                  <Flex mt={"10px"} gap={"10px"} flexDir={"column"}>
                    {contractCareer?.map((item, idx) => {
                      return <VerifyCard key={idx} career={item} />;
                    })}
                  </Flex>
                )}
              </TabPanel>
              <TabPanel>
                <Flex>
                  <Heading fontSize={"3xl"} mb={"10px"}>{`${
                    contractReview?.length ?? 0
                  }개의 리뷰`}</Heading>
                  <Spacer />
                  <Button onClick={onOpen} colorScheme={"blue"}>
                    리뷰 등록
                  </Button>
                </Flex>
                <Flex mt={"10px"} gap={"10px"} flexDir={"column"}>
                  {contractReview?.map((item, idx) => {
                    return <ReviewCard key={idx} review={item} />;
                  })}
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <ReviewPostPopup
          isOpen={isOpen}
          onClose={onClose}
          companyAddress={enterprise?.account.accountAddress}
        />
      </Box>
    </CenterLayout>
  );
};

interface verifyCard_props {
  career: Career_Item;
}

const VerifyCard = ({ career }: verifyCard_props) => {
  return (
    <Stack
      border={`1px solid ${colors.secondery[300]}`}
      p={3}
      borderRadius={"xl"}
    >
      <Heading fontSize={"sm"}>{"신청자"}</Heading>
      <Box>{`${career.worker}`}</Box>
      <Divider />
      <Box mt={3}>
        <Heading fontSize={"sm"}>{"상태"}</Heading>
        {CareerStatus[career.status] === "거절" ? (
          <Box color={colors.red[400]}>{`${CareerStatus[career.status]}`}</Box>
        ) : CareerStatus[career.status] === "승인" ? (
          <Box color={colors.blue[400]}>{`${CareerStatus[career.status]}`}</Box>
        ) : (
          <Box color={colors.secondery[400]}>{`${
            CareerStatus[career.status]
          }`}</Box>
        )}
      </Box>
    </Stack>
  );
};

interface reviewCard_props {
  review: Review_Item;
}

const ReviewCard = ({ review }: reviewCard_props) => {
  return (
    <Stack
      border={`1px solid ${colors.secondery[300]}`}
      p={3}
      borderRadius={"xl"}
    >
      {review.nftUri ? (
        <Link
          href={`https://testnets.opensea.io/assets/rinkeby/0x90a30F0de9a6E6117cdC35e2f7aB6503e4190198/${review.id}`}
          passHref
        >
          <Flex alignItems={"center"} gap={"5px"} cursor={"pointer"} mb={"5px"}>
            <NextImage src={opensea} width={"30px"} height={"30px"} />
            <Text fontSize={"sm"} fontWeight={"bold"} color={colors.blue[400]}>
              OpenSea에서 보기
            </Text>
          </Flex>
        </Link>
      ) : null}
      <Heading fontSize={"sm"}>{"작성자"}</Heading>
      <Box>{`${review.writer}`}</Box>
      <Divider />
      <Box mt={3}>
        <Heading fontSize={"sm"}>{"제목"}</Heading>
        <Box>{`${review.title}`}</Box>
        <Heading mt={3} fontSize={"sm"}>
          {"내용"}
        </Heading>
        <Box>
          <Text whiteSpace={"pre-line"}>{`${review.content}`}</Text>
        </Box>
      </Box>
    </Stack>
  );
};

export default CompanyDetail;
