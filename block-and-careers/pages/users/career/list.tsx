import ProfileLayout from "@components/layouts/profilelayout";
import { useRecoilState } from "recoil";

import { Account_Model } from "@restapi/types/account";
import { Career_Item } from "@restapi/types/career";
import { EnterPrise_Entity } from "@restapi/types/enterprise";

import { account_state } from "@state/web3/account";
import { getEnterSelector } from "@state/enterprise";

import { useBlockJobs } from "@hooks/BlockJobsContract";
import { Profile_Box, Profile_Info } from "../profile";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CareerList = () => {
  const [contractCareer, setCareer] = useState<Career_Item[]>([]);

  const [accountstate] = useRecoilState<Account_Model | null>(account_state);
  const { getCareerByWorker } = useBlockJobs();

  useEffect(() => {
    const fetch = async () => {
      const value: Career_Item[] = await getCareerByWorker(
        accountstate?.accountAddress
      );
      setCareer(value);
    };
    fetch();
  }, [accountstate]);

  return (
    <ProfileLayout
      title="경력현황"
      navbartitle={`${accountstate?.user.name}님`}
    >
      <Profile_Box boxTitle="검증되지 않은 경력">
        <Flex></Flex>
      </Profile_Box>
      <Profile_Box boxTitle="검증된 경력">
        <Flex gap={5} direction={"column"}>
          {contractCareer.map((item, idx) => {
            return <Career_Card key={idx} career={item} />;
          })}
        </Flex>
      </Profile_Box>
    </ProfileLayout>
  );
};

interface card_props {
  career: Career_Item;
}

const Career_Card = ({ career }: card_props) => {
  const [enter] = useRecoilState<EnterPrise_Entity[]>(getEnterSelector);

  return (
    <>
      <Box
        border={"1px solid gray"}
        boxShadow={"xl"}
        borderRadius={"md"}
        padding={5}
      >
        <Heading fontSize={"xl"} mb={3}>
          {
            enter?.find((e) => e.account.accountAddress === career.company)
              ?.title
          }
        </Heading>

        <Flex>
          <Profile_Info title="직무">{`${career.roles.join(
            ", "
          )}`}</Profile_Info>

          <Profile_Info title="근무 기간">{`${new Date(
            career.stDt.toNumber()
          ).toLocaleDateString()} ~ ${new Date(
            career.fnsDt.toNumber()
          ).toLocaleDateString()} `}</Profile_Info>
        </Flex>
        <Profile_Info title="근무내용">{`${career.description}`}</Profile_Info>
      </Box>
    </>
  );
};

export default CareerList;
