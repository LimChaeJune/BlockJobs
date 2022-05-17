import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { selectList, SelectTypes } from "@state/datas/usertype";
import { FaRegBuilding, FaRegUser } from "react-icons/fa";
import colors from "themes/foundations/colors";

function SelectPage() {
  const selects: SelectTypes[] = selectList();

  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      paddingTop={"10%"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box
        border={`1px ${colors.secondery[300]} solid`}
        w="50%"
        textAlign="center"
      >
        <Heading fontSize={"2xl"} marginTop={"10px"} marginBottom={"10px"}>
          BlockJobs의 서비스를 이용하시려면 회원 등록을 먼저 진행해주세요
        </Heading>
        <Flex height={"100%"} width={"100%"}>
          {selects.map((item: SelectTypes, idx) => {
            return (
              <Flex
                key={idx}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                border={`1px ${colors.secondery[300]} solid`}
                height={"200px"}
                width={"50%"}
                as={Button}
                margin={"3px"}
              >
                {item.title === "기업회원" ? <FaRegBuilding /> : <FaRegUser />}
                <Text fontSize={"xl"}>{item.title}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
}

export default SelectPage;
