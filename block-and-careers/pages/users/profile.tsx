import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { useWeb3 } from "@hooks/Web3Client";
import JbcAccount from "@components/web3/JbcAccount";
import UserNav from "@components/layouts/userNav";

const Profile_User = () => {
  return (
    <Box width={"100%"}>
      <UserNav title="프로필" />
    </Box>
  );
};

export default Profile_User;
