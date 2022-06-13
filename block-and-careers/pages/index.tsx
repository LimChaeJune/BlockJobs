import { Text, Box, Flex, Heading, Button, Icon } from "@chakra-ui/react";
import type { NextPage } from "next";
import { IconType } from "react-icons";
import colors from "themes/foundations/colors";
import { GoVerified } from "react-icons/go";
import { MdSwapVerticalCircle } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { Fade } from "react-awesome-reveal";

const Home: NextPage = () => {
  const mainBtns: MainBtn_props[] = [
    {
      title: "Smart Contract",
      description:
        "Smart Contract로 경력 증명을 신청하여 경력을 영구히 보관, 경력을 증명하는 기업에선 승인 혹은 거절로 보상으로 BRC 토큰 흭득.",
      icon: GoVerified,
      delay: 250,
    },
    {
      title: "Token",
      icon: MdSwapVerticalCircle,
      description:
        "ETH와 ERC-20 인터페이스 기반의 BJC 토큰과 스왑, BJC 토큰으로 리뷰 작성과 경력 증명 신청",
      delay: 500,
    },
    {
      title: "NFT",
      description:
        "경력을 검증한 실제 근무자의 기업 후기를 조회 그리고 내가 작성한 후기를 NFT로!",
      icon: BsPencilSquare,
      delay: 750,
    },
  ];

  return (
    <Box>
      <Flex
        position={"relative"}
        paddingBottom={"100px"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        minHeight={"calc(100vh - 80px)"}
        gap={"10%"}
        bg={"white"}
        flexDirection={"column"}
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
            _hover={{ shadow: "xl" }}
          >
            BlockJobs 가이드 보기
          </Button>
        </Box>
        <Flex gap={"10px"} marginTop={"100px"}>
          {mainBtns.map((item, idx) => {
            return (
              <MainBtnBox
                key={idx}
                delay={item.delay}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </Flex>
      </Flex>
      <Flex
        height={"860px"}
        width={"1024px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Fade duration={2000}>
          {
            <Box>
              <Heading>
                클릭 한번으로 <br /> 경력을 영구히 보관
              </Heading>
            </Box>
          }
        </Fade>
      </Flex>
    </Box>
  );
};

interface MainBtn_props {
  icon: IconType;
  title: string;
  description: string;
  delay: number;
}

const MainBtnBox = ({ icon, title, description, delay }: MainBtn_props) => {
  return (
    <Fade duration={2000} delay={delay}>
      <Flex
        background={colors.blue[400]}
        height={"200px"}
        width={"300px"}
        borderRadius={"xl"}
        textAlign={"center"}
        pr={"15px"}
        pl={"15px"}
        gap={"5px"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"pointer"}
        _hover={{ shadow: "xl", opacity: "90%" }}
      >
        <Icon as={icon} color={colors.white} fontSize={"3xl"} />
        <Heading color={colors.white} fontSize={"2xl"}>
          {title}
        </Heading>
        <Text color={colors.secondery[200]} fontSize={"sm"}>
          {description}
        </Text>
      </Flex>
    </Fade>
  );
};

export default Home;
