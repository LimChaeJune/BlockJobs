import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { useWeb3 } from "@hooks/Web3Client";
import JbcAccount from "@components/web3/JbcAccount";
import UserNav from "@components/layouts/sidenavbar";
import { ReactChild, ReactNode } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  initialWeb3,
  Web3_Model,
  balance,
  account_state,
} from "@state/web3/account";
import { Account_Model } from "@restapi/types/account";
import colors from "themes/foundations/colors";
import shadows from "themes/foundations/shadows";

const Profile_User = () => {
  const [accountstate] = useRecoilState<Account_Model | null>(account_state);
  const [web3state] = useRecoilState<Web3_Model>(initialWeb3);
  const [balanceState] = useRecoilState<string | undefined>(balance);

  return (
    <Box width={"100%"}>
      <Heading>{`${accountstate?.user.name}님`}</Heading>
      <UserNav title="프로필">
        <Profile_Box boxTitle="지갑정보">
          <Profile_Info title="지갑 주소">{`${accountstate?.accountAddress}`}</Profile_Info>
          <Profile_Info title="보유량">{`${balanceState} JJC`}</Profile_Info>
        </Profile_Box>

        <Profile_Box boxTitle="직무">
          <Box>{`BJC - ${balanceState}`}</Box>
        </Profile_Box>

        <Profile_Box boxTitle="지갑정보">
          <Box>{`${web3state?.address}`}</Box>
          <Box>{`BJC - ${balanceState}`}</Box>
        </Profile_Box>
      </UserNav>
    </Box>
  );
};

interface Box_Props {
  boxTitle: string;
  children: ReactNode;
}
const Profile_Box = ({ boxTitle, children }: Box_Props) => {
  return (
    <Box
      w={"100%"}
      boxShadow={shadows.outline}
      padding={"3em 2em 2em 2em"}
      borderRadius={"2px"}
      background={"white"}
    >
      <Heading fontSize={"lg"} mb={"1em"}>
        {boxTitle}
      </Heading>
      {children}
    </Box>
  );
};

interface Info_Props {
  title: string;
  children: ReactNode;
}

const Profile_Info = ({ title, children }: Info_Props) => {
  return (
    <Flex w={"100%"} mb={"1em"} gap={"5px"} flexDirection={"column"}>
      <Heading fontSize={"md"} color={`${colors.secondery[500]}`}>
        {title}
      </Heading>
      {children}
    </Flex>
  );
};

export default Profile_User;
