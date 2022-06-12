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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import colors from "themes/foundations/colors";

const CompanyDetail = () => {
  const { getCareerByCompany } = useBlockJobs();
  // 기업 상세 정보
  const [enterprise, setEnterprise] = useState<EnterPrise_Entity>();
  // 컨트랙트 상 경력
  const [contractCareer, setCareer] = useState<Career_Item[]>([]);
  // 컨트랙트 리뷰 목록
  const [contractReview, setReviews] = useState<Career_Item[]>([]);

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

  useEffect(() => {
    const routeId = router.query.enterpriseId;
    const fetchAction = async () => {
      if (routeId) {
        await GetEnterPriseById(routeId).then(async (res) => {
          console.log(res);
          await setEnterprise(res.data);
        });
      }
    };
    fetchAction();
  }, [router]);

  useEffect(() => {
    const fetchAction = async () => {
      await getContractCareer();
    };
    fetchAction();
  }, [enterprise]);

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
            <Divider orientation="vertical" />
          </Center>
          <Box>
            <Heading fontSize={"xl"}>기업 소개</Heading>
            <Text mt={3}>{enterprise?.description}</Text>
          </Box>
          <Divider mt={5} />
          <Tabs isFitted variant="enclosed" mt={"30px"}>
            <TabList mb="1em">
              <Tab>기업이 검증한 경력</Tab>
              <Tab>기업 리뷰</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Heading fontSize={"3xl"} mb={"10px"}>{`${
                  contractCareer?.length ?? 0
                }개의 경력`}</Heading>
                {contractCareer?.length === 0 ? (
                  <Heading color={"black"} fontSize={"xl"}>
                    아직 신청받은 경력이 없습니다.
                  </Heading>
                ) : (
                  <Flex gap={"10px"} flexDir={"column"}>
                    {contractCareer?.map((item, idx) => {
                      return <VerifyCard key={idx} career={item} />;
                    })}
                  </Flex>
                )}
              </TabPanel>
              <TabPanel>
                <Flex>
                  <Heading fontSize={"3xl"} mb={"10px"}>{`${
                    contractCareer?.length ?? 0
                  }개의 리뷰`}</Heading>
                  <Spacer />
                  <Button onClick={onOpen} colorScheme={"blue"}>
                    리뷰 등록
                  </Button>
                </Flex>
                <Flex gap={"10px"} flexDir={"column"}></Flex>
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
    </Stack>
  );
};

interface reviewCard_props {
  career: Career_Item;
}

const ReviewCard = ({ career }: verifyCard_props) => {
  return (
    <Stack
      border={`1px solid ${colors.secondery[300]}`}
      p={3}
      borderRadius={"xl"}
    >
      <Heading fontSize={"sm"}>{"신청자"}</Heading>
      <Box>{`${career.worker}`}</Box>
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
    </Stack>
  );
};

export default CompanyDetail;
