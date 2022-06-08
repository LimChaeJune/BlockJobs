import { useRecoilState } from "recoil";

import { AccountUserType, Account_Model } from "@restapi/types/account";
import { CareerStatus, Career_Item } from "@restapi/types/career";
import { EnterPrise_Entity } from "@restapi/types/enterprise";

import { account_state } from "@state/web3/account";
import { getEnterSelector } from "@state/enterprise";

import { useBlockJobs } from "@hooks/BlockJobsContract";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserCareerEntity } from "@restapi/types/user";

import colors from "themes/foundations/colors";
import {
  Profile_Box,
  Profile_Info,
} from "@components/users/profile/Profile_Box";
import ProfileLayout from "@components/layouts/profilelayout";
import CareerPost from "@components/users/career/PostModal";
import { GetUserCareers } from "@restapi/users/get";
import { AddUserCareer, UpdateUserCareer } from "@restapi/users/post";

const CareerList = () => {
  const [accountstate] = useRecoilState<Account_Model | null>(account_state);

  // 컨트랙트로 등록된 경력
  const [contractCareer, setCareer] = useState<Career_Item[]>([]);
  // DB에 등록된 경력
  const [careers, setcareer] = useState<UserCareerEntity[]>([]);
  const { getCareerByWorker } = useBlockJobs();

  const { onClose, isOpen, onOpen } = useDisclosure();

  const CompleteSubmit = () => {
    getDBCareer();
  };

  const getDBCareer = async () => {
    if (accountstate?.user.id) {
      await GetUserCareers(accountstate?.user.id).then((res) => {
        console.log(res);
        setcareer(res.data);
      });
    }
  };

  // 컨트랙트로 등록된 경력 조회
  const getContractCareer = async () => {
    const value: Career_Item[] = await getCareerByWorker(
      accountstate?.accountAddress
    );
    setCareer(value);
  };

  useEffect(() => {
    // DB에 등록된 경력
    getContractCareer();
    getDBCareer();
  }, [accountstate?.accountAddress]);

  return (
    <ProfileLayout
      title="경력 현황"
      usertype={AccountUserType.Customer}
      navbartitle={`${accountstate?.user?.name}님`}
    >
      <Button
        bg={colors.blue[200]}
        color={"white"}
        _hover={{ bg: colors.blue[300] }}
        onClick={onOpen}
      >
        경력 등록하기
      </Button>
      <Profile_Box boxTitle="블록체인에 올라간 경력">
        <Flex gap={5} direction={"column"}>
          {contractCareer?.map((item, idx) => {
            return <Contract_Career_Card key={idx} career={item} />;
          })}
        </Flex>
      </Profile_Box>

      <Profile_Box boxTitle="증명되지 않은 경력">
        <Flex gap={5} direction={"column"}>
          {careers?.map((item, idx) => {
            return <Career_Card key={idx} career={item} />;
          })}
        </Flex>
      </Profile_Box>

      <CareerPost
        isOpen={isOpen}
        onClose={onClose}
        completeSubmit={CompleteSubmit}
      />
    </ProfileLayout>
  );
};

interface card_props {
  career: UserCareerEntity;
}

const Career_Card = ({ career }: card_props) => {
  const [enter] = useRecoilState<EnterPrise_Entity[]>(getEnterSelector);

  const { createCareer } = useBlockJobs();

  const signCreateCareer = async (data: UserCareerEntity) => {
    try {
      console.log(data);
      await createCareer({
        myRoles: data.roles?.split(", ") ?? [],
        description: data.description ?? "",
        company_address: data.companyAddress,
        stDt: data.stDt ?? new Date(),
        fnsDt: data.fnsDt ?? new Date(),
      }).then(async (receipt) => {
        await UpdateUserCareer({
          description: career.description ?? "",
          roles: career.roles ?? "",
          stDt: career.stDt ?? new Date(),
          fnsDt: career.fnsDt ?? new Date(),
          careerId: career.id,
          transactionId: receipt.transactionHash,
        });
        console.log(receipt);
      });
    } catch (e) {
      alert("contract SignTX를 실패했습니다. 다시 시도해주세요");
    }
  };

  return (
    <>
      <Box
        border={"1px solid gray"}
        boxShadow={"xl"}
        borderRadius={"md"}
        padding={5}
      >
        <Heading fontSize={"xl"} mb={3}>
          {enter?.find(
            (e) => e.account.accountAddress === career.companyAddress
          )?.title ?? career.companyAddress}
        </Heading>

        <Flex>
          <Profile_Info title="직무">{career.roles}</Profile_Info>
          <Profile_Info title="근무 기간">{`${career?.stDt} ~ ${career?.fnsDt}`}</Profile_Info>
        </Flex>
        <Profile_Info title="근무내용">{`${career.description}`}</Profile_Info>

        <Button
          background={colors.blue[300]}
          color={"white"}
          _hover={{ bg: colors.blue[400] }}
          onClick={() => signCreateCareer(career)}
        >
          검증하기
        </Button>
      </Box>
    </>
  );
};

interface contract_career_props {
  career: Career_Item;
}

const Contract_Career_Card = ({ career }: contract_career_props) => {
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
      </Box>
    </>
  );
};

export default CareerList;
