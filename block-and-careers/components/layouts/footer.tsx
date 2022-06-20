import { Flex, Heading, Text } from "@chakra-ui/react";
import colors from "themes/foundations/colors";

const Footer = () => {
  return (
    <Flex
      w={"100%"}
      height={"200px"}
      alignItems={"center"}
      justifyContent={"center"}
      background={colors.secondery[100]}
      flexDir={"column"}
      borderTop={`1px solid ${colors.secondery[300]}`}
    >
      <Heading fontSize={"xl"} mb={2}>
        BlockJobs
      </Heading>
      <Flex gap={2} alignItems={"center"}>
        <Heading fontSize={"sm"}>Contact</Heading>
        <Text fontSize={"sm"}>cownsgg@outlook.com</Text>
      </Flex>
      <Heading fontSize={"sm"} color={colors.secondery[400]}>
        BlockJobs는 테스트용 Dapp이며 수집되는 정보는 Dapp 내에서만 이용됩니다.
      </Heading>
    </Flex>
  );
};
export default Footer;
