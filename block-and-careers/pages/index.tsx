import { Text, Box, Flex, Heading, Button } from "@chakra-ui/react";
import LoadingModal from "@components/utils/loadingModal";
import type { NextPage } from "next";
import { useEffect } from "react";
import colors from "themes/foundations/colors";

const Home: NextPage = () => {
  return (
    <Box>
      <Flex
        position={"relative"}
        paddingTop={"100px"}
        alignItems={"center"}
        width={"100%"}
        flexDirection={"column"}
        minHeight={"calc(100vh - 80px)"}
        gap={"30px"}
        bg={"white"}
      >
        <Box textAlign={"center"}>
          <Heading
            color={colors.blue[300]}
            fontSize={"sm"}
            marginBottom={"10px"}
            cursor={"pointer"}
          >
            BlockJobs는 이렇게 만들어졌습니다!
          </Heading>
          <Heading textAlign={"center"}>
            경력을 영구적으로 관리할 수 있는 <br /> 사이트 BlockJobs
          </Heading>
          <Text
            marginTop={"20px"}
            fontSize={"md"}
            color={colors.secondery[400]}
            fontWeight={"bold"}
          >
            Ethereum Smart Contract로 블록체인 네트워크에
            <br /> 경력을 영구히 보관해봐요
          </Text>
          <Button
            marginTop={"20px"}
            borderRadius={"3xl"}
            padding={"25px 30px 25px 30px"}
          >
            BlockJobs 가이드 보기
          </Button>
        </Box>
      </Flex>
      <Flex height={"860px"} justifyContent={"center"} alignItems={"center"}>
        <Box>클릭 한번으로 경력을 영구 보관!</Box>
      </Flex>
    </Box>
  );
};

export default Home;
