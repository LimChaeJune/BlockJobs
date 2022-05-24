import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Container,
  Textarea,
  Tag,
  TagLabel,
  TagCloseButton,
  Box,
  Heading,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { initialWeb3, Web3_Model } from "@state/web3/account";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useWeb3 } from "@hooks/Web3Client";
import { BigNumber, ethers } from "ethers";
import SearchEnterModal from "@components/enterprise/searchEnterpriseModal";
import { EnterPrise_Entity } from "restapi/enterprise/get";
import { AccountUserType } from "restapi/users/post";
import { InferGetStaticPropsType } from "next";
import colors from "themes/foundations/colors";

interface IFormInput {
  roles: string[];
  description: string;
  worker: string;
  company: string;
  stDt: number;
  fnsDt: number;
}

function Post({ enterprise }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [web3State] = useRecoilState<Web3_Model>(initialWeb3);
  const { connect } = useWeb3();
  const [myRoles, setMyRoles] = useState<string[]>([]);
  const [curr_role, setCurrRole] = useState<string>();
  const [curr_company, setCompany] = useState<EnterPrise_Entity>();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<IFormInput>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const contract = await connect();
    try {
      console.log(
        myRoles,
        data.description,
        curr_company?.account.accountAddress
      );
      await contract?.createCareer(
        myRoles,
        data.description,
        curr_company?.account.accountAddress,
        new Date(data.stDt).getTime(),
        new Date(data.fnsDt).getTime(),
        1000000
      );
    } catch (e) {
      console.log(e);
      alert("contract SignTX를 실패했습니다. 다시 시도해주세요");
    }

    // reset();
    // setMyRoles([]);
    // setCompany(undefined);
  };

  const TestContract = async () => {
    const contract = await connect();
    await contract?.BalanceOf(web3State.address).then((res: BigNumber) => {
      console.log(ethers.utils.formatEther(res.toString()));
    });
  };

  const TagEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && curr_role !== undefined) {
      setMyRoles([...myRoles, curr_role]);
      setCurrRole(undefined);
    }
  };
  const TagDelete = (tagItem: string) => {
    setMyRoles(myRoles.filter((e) => e !== tagItem));
  };

  const changeTagValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrRole(e.target.value);
  };

  return (
    <Box width={"100%"}>
      {/* <Button onClick={TestContract}>TEXTBUTTON</Button> */}
      <Box
        width={"1060px"}
        position={"relative"}
        alignItems={"center"}
        margin={"0 auto"}
        mt={"30px"}
      >
        <Heading size={"lg"}>경력 신청</Heading>
        <Divider mt={"20px"} mb={"20px"} />
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>근무 회사</FormLabel>
              <Flex alignItems={"center"}>
                <Input value={curr_company?.title} mr={2} readOnly />
                <Button onClick={onOpen}>회사 검색</Button>
              </Flex>
            </FormControl>

            <FormControl mt={"20px"}>
              <FormLabel>근무 시작일</FormLabel>
              <Input
                type={"date"}
                placeholder="근무 시작일 입력해주세요"
                {...register("stDt", {
                  required: "근무 시작일은 필수 입력 항목입니다.",
                })}
              />
            </FormControl>

            <FormControl mt={"20px"}>
              <FormLabel>근무 종료일</FormLabel>
              <Input
                type={"date"}
                placeholder="근무 종료일을 입력해주세요"
                {...register("fnsDt", {
                  required: "근무 종료일은 필수 입력 항목입니다.",
                })}
              />
            </FormControl>

            <FormControl mt={"20px"}>
              <FormLabel>담당 직무/업무</FormLabel>
              <Input
                type={"text"}
                value={curr_role}
                onKeyDown={TagEnter}
                onChange={changeTagValue}
              />
              {myRoles ? (
                <Flex mt={2} gap={2}>
                  {myRoles?.map((item, idx) => {
                    return (
                      <Tag key={idx} borderRadius={"full"}>
                        <TagLabel>{item}</TagLabel>
                        <TagCloseButton
                          onClick={() => {
                            TagDelete(item);
                          }}
                        />
                      </Tag>
                    );
                  })}
                </Flex>
              ) : null}
            </FormControl>

            <FormControl mt={"20px"}>
              <FormLabel>근무 내용</FormLabel>
              <Textarea
                placeholder="근무 내용을 입력해주세요 (예: [삼성전자] 반도체 프로젝트를 진행했습니다...)"
                {...register("description", {
                  required: "근무 내용은 필수 입력 항목입니다.",
                })}
              />
            </FormControl>
            <Button mt={4} isLoading={isSubmitting} type="submit">
              경력 신청
            </Button>
          </form>
        </Box>
      </Box>
      <SearchEnterModal
        isOpen={isOpen}
        onClose={onClose}
        enterprises={enterprise}
        setCompany={setCompany}
      ></SearchEnterModal>
    </Box>
  );
}

export async function getStaticProps() {
  const enterprise: EnterPrise_Entity[] = [
    {
      title: "text",
      description: "test",
      account: {
        accountAddress: "0x5D69803794eeA5ccF9963aAA1717012783A7cCF6",
        accountProvider: "test",
        userType: AccountUserType.Enterprise,
      },
      businessNumber: "1234-1234-123",
    },
  ];

  return {
    props: {
      enterprise,
    },
  };
}

export default Post;
