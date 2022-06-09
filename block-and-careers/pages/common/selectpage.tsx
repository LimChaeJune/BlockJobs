import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Register_Enterprise from "@components/enterprise/registerModal";
import Register_User from "@components/users/registerModal";
import { selectList, SelectTypes } from "@state/datas/usertype";
import { useCallback } from "react";
import { FaRegBuilding, FaRegUser } from "react-icons/fa";
import colors from "themes/foundations/colors";
import { GetRootJobs } from "restapi/jobs/get";
import { InferGetStaticPropsType } from "next";
import { GetIndustry } from "restapi/industry/get";
import CenterLayout from "@components/layouts/centerlayout";

function SelectPage({
  rootJobs,
  industry,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // useEffect(() => {
  //   const item = async () => {
  //     const res = await GetRootJobs();
  //     const rootJobs = res.data;
  //     console.log(rootJobs)
  //   };
  //   item();
  // },[]);

  const {
    isOpen: isOpenEnterprise,
    onOpen: opOpenEnterprise,
    onClose: onCloseEnterprise,
  } = useDisclosure();

  const {
    isOpen: isOpenUser,
    onOpen: onOpenUser,
    onClose: onCloseUser,
  } = useDisclosure();

  const ButtonClick = useCallback((types: string) => {
    if (types === "기업회원") {
      opOpenEnterprise();
    } else {
      onOpenUser();
    }
  }, []);

  const selects: SelectTypes[] = selectList();

  return (
    <CenterLayout>
      <Box w={"100%"}>
        <Heading size={"lg"}>회원 등록</Heading>
        <Box mt={10} textAlign="center">
          <Heading fontSize={"xl"} marginTop={"10px"} marginBottom={"10px"}>
            BlockJobs의 서비스를 이용하시려면 회원 등록을 먼저 진행해주세요{" "}
            <br /> (등록 시 토큰 사용을 위한 Approve를 승인해야합니다.)
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
                  bg={"white"}
                  onClick={() => {
                    ButtonClick(item.title);
                  }}
                >
                  {item.title === "기업회원" ? (
                    <FaRegBuilding />
                  ) : (
                    <FaRegUser />
                  )}
                  <Text fontSize={"xl"}>{item.title}</Text>
                </Flex>
              );
            })}
          </Flex>
        </Box>
        <Register_Enterprise
          isOpen={isOpenEnterprise}
          onClose={onCloseEnterprise}
          rootIndustry={industry}
        />
        <Register_User
          isOpen={isOpenUser}
          onClose={onCloseUser}
          rootJobs={rootJobs}
        />
      </Box>
    </CenterLayout>
  );
}

export async function getStaticProps() {
  const res_industry = await GetIndustry();
  const res_rootjob = await GetRootJobs();
  const rootJobs = res_rootjob.data;
  const industry = res_industry.data;

  return {
    props: {
      rootJobs,
      industry,
    },
  };
}

export default SelectPage;
