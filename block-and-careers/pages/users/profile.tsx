import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { useWeb3 } from "@hooks/Web3Client";
import JbcAccount from "@components/web3/JbcAccount";
import UserNav from "@components/layouts/sidenavbar";
import { ReactChild, ReactNode } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { initialWeb3, Web3_Model, balance } from "@state/web3/account";

const Profile_User = () => {
  const [web3state] = useRecoilState<Web3_Model>(initialWeb3);
  const [balanceState] = useRecoilState<string | undefined>(balance);

  return (
    <Box width={"100%"}>
      <UserNav title="프로필">
        <Profile_Box boxTitle="지갑정보">
          <Box>{`${web3state?.address}`}</Box>
          <Box>{`BJC - ${balanceState}`}</Box>
        </Profile_Box>
      </UserNav>
    </Box>
  );
};

interface Props {
  boxTitle: string;
  children: ReactNode;
}
const Profile_Box = ({ boxTitle, children }: Props) => {
  return (
    <Box>
      <Heading fontSize={"lg"}>{boxTitle}</Heading>
      {children}
    </Box>
  );
};

export default Profile_User;
