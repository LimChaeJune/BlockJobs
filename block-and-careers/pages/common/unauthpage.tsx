import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import colors from "themes/foundations/colors";

const UnAuthPage = () => {
  return (
    <Flex
      textAlign={"center"}
      flexDir={"column"}
      gap={5}
      justifyContent={"center"}
      alignItems={"center"}
      height={"calc(100vh - 100px)"}
    >
      <Heading>권한이 없는 페이지 주소입니다! 😥 </Heading>
      <Link href={"/"} passHref>
        <Heading mt={5} cursor={"pointer"} _hover={{ color: colors.blue[400] }}>
          홈화면으로 가기
        </Heading>
      </Link>
    </Flex>
  );
};

export default UnAuthPage;
