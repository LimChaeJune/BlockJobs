import { useRecoilState } from "recoil";
import { AccountUserType, Account_Model } from "@restapi/types/account";
import { CareerStatus, Career_Item } from "@restapi/types/career";
import { EnterPrise_Entity } from "@restapi/types/enterprise";
import { account_state } from "@state/web3/account";
import { getEnterSelector } from "@state/enterprise";
import { useBlockJobs } from "@hooks/BlockJobsContract";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Profile_Box,
  Profile_Info,
} from "@components/users/profile/Profile_Box";
import ProfileLayout from "@components/layouts/profilelayout";
import { GetUserByAccount } from "@restapi/users/get";
import { User_Entity } from "@restapi/types/user";
import colors from "themes/foundations/colors";

const CareerList = () => {
  const [accountstate] = useRecoilState<Account_Model | null>(account_state);

  // 컨트랙트로 등록된 경력
  const [contractCareer, setCareer] = useState<Career_Item[]>([]);
  const { getCareerByComany } = useBlockJobs();

  // 컨트랙트로 등록된 경력 조회
  const getContractCareer = async () => {
    const value: Career_Item[] = await getCareerByComany(
      accountstate?.accountAddress
    );
    setCareer(value);
  };

  useEffect(() => {
    // DB에 등록된 경력
    getContractCareer();
  }, [accountstate?.accountAddress]);

  return (
    <ProfileLayout
      title="경력 현황"
      usertype={AccountUserType.Enterprise}
      navbartitle={`${accountstate?.enterprise?.title}님`}
    >
      <Profile_Box boxTitle="블록체인에 올라간 경력">
        <Flex gap={5} direction={"column"}>
          {contractCareer?.map((item, idx) => {
            return <Contract_Career_Card key={idx} career={item} />;
          })}
        </Flex>
      </Profile_Box>
    </ProfileLayout>
  );
};

interface contract_career_props {
  career: Career_Item;
}

const Contract_Career_Card = ({ career }: contract_career_props) => {
  const { approveCareer } = useBlockJobs();
  const [user, setUser] = useState<User_Entity>();

  const getuserAccount = async () => {
    await GetUserByAccount(career.worker).then((res) => {
      setUser(res.data);
    });
  };

  const Btn_Click_Career = async ({ status }: { status: CareerStatus }) => {
    approveCareer({ careerId: career.id, status: status });
  };

  useEffect(() => {
    getuserAccount();
  }, []);

  const [enter] = useRecoilState<EnterPrise_Entity[]>(getEnterSelector);

  return (
    <>
      <Box
        border={"1px solid gray"}
        boxShadow={"xl"}
        borderRadius={"md"}
        padding={5}
      >
        <Heading fontSize={"md"} mb={3}>
          To:
          {`${career.company} (${
            enter?.find((e) => e.account.accountAddress === career.company)
              ?.title ?? "회원등록 되지 않은 주소"
          })`}
        </Heading>
        <Profile_Info title="처리 상태">
          <Text
            color={
              parseInt(career.status.toString()) === 1
                ? "blue.300"
                : parseInt(career.status.toString()) === 2
                ? "red.400"
                : "black"
            }
          >
            {CareerStatus[parseInt(career.status.toString())]}
          </Text>
        </Profile_Info>
        <Flex>
          <Profile_Info title="직무">{career.roles.join(", ")}</Profile_Info>
          <Profile_Info title="근무 기간">{`${new Date(
            career.stDt.toNumber()
          ).toLocaleDateString()} ~ ${new Date(
            career.fnsDt.toNumber()
          ).toLocaleDateString()}`}</Profile_Info>
        </Flex>
        <Profile_Info title="근무내용">{`${career.description}`}</Profile_Info>
        <Profile_Info title="신청자">{`${career.worker} (${
          user?.name ?? "회원등록 되지 않은 유저입니다."
        })`}</Profile_Info>
        {career.status === CareerStatus.대기중 ? (
          <Flex gap={5}>
            <Button
              bg={colors.blue[300]}
              _hover={{
                bg: colors.blue[400],
              }}
              color={"white"}
              onClick={() => Btn_Click_Career({ status: CareerStatus.승인 })}
            >
              승인
            </Button>
            <Button
              bg={"red.300"}
              _hover={{
                bg: "red.400",
              }}
              color={"white"}
              onClick={() => Btn_Click_Career({ status: CareerStatus.거절 })}
            >
              거절
            </Button>
          </Flex>
        ) : null}
      </Box>
    </>
  );
};

export default CareerList;
