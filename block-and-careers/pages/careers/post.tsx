import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
import SearchEnterModal from "@components/enterprise/searchEnterpriseModal";
import { EnterPrise_Entity } from "restapi/enterprise/get";
import { AccountUserType } from "restapi/types/account";
import { InferGetStaticPropsType } from "next";
import { useBlockJobs } from "@hooks/BlockJobsContract";
import { BigNumber, ethers } from "ethers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInput {
  roles: string[];
  description: string;
  company: string;
  stDt: Date;
  fnsDt: Date;
}

const career_Schema = yup.object().shape({
  description: yup
    .string()
    .required("근무 내용은 필수입력 내용입니다.")
    .min(10, "최소 10자 이상의 근무내용을 작성해주세요"),
  stDt: yup.date().required("근무시작 날짜는 필수입력 내용입니다."),
  fnsDt: yup.date().required("근무종료 날짜는 필수입력 내용입니다."),
  roles: yup.array().min(1, "한 개 이상의 직무를 등록해야합니다."),
});

function Post({ enterprise }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const [web3State] = useRecoilState<Web3_Model>(initialWeb3);
  const { createCareer } = useBlockJobs();
  const [myRoles, setMyRoles] = useState<string[]>([]);
  const [curr_role, setCurrRole] = useState<string>();
  const [curr_company, setCompany] = useState<EnterPrise_Entity>();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IFormInput>({ resolver: yupResolver(career_Schema) });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await createCareer({
        myRoles: myRoles,
        description: data.description,
        company_address: curr_company?.account.accountAddress,
        stDt: data.stDt,
        fnsDt: data.fnsDt,
      });
    } catch (e) {
      console.log(e);
      alert("contract SignTX를 실패했습니다. 다시 시도해주세요");
    }
  };

  // const TestContract = async () => {
  //   await BalanceOf(web3State.address).then((res: BigNumber) => {
  //     console.log(ethers.utils.formatEther(res.toString()));
  //   });
  //   console.log(errors.description);
  // };

  const TagEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && curr_role !== undefined) {
      setMyRoles([...myRoles, curr_role]);
      setCurrRole(undefined);
      setValue("roles", myRoles);
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
            <FormControl
              isRequired
              isReadOnly
              isInvalid={curr_company === undefined}
            >
              <FormLabel>근무 회사</FormLabel>
              <Flex alignItems={"center"}>
                <Input value={curr_company?.title} mr={2} readOnly />
                <Button onClick={onOpen}>회사 검색</Button>
              </Flex>
              <FormErrorMessage>{"회사를 선택해주세요"}</FormErrorMessage>
            </FormControl>

            <Flex gap={"10px"}>
              <FormControl isRequired isInvalid={!!errors.stDt} mt={"20px"}>
                <FormLabel>근무 시작일</FormLabel>
                <Input
                  type={"date"}
                  placeholder="근무 시작일 입력해주세요"
                  {...register("stDt")}
                />
                <FormErrorMessage>{errors?.stDt?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.fnsDt} mt={"20px"}>
                <FormLabel>근무 종료일</FormLabel>
                <Input
                  type={"date"}
                  placeholder="근무 종료일을 입력해주세요"
                  {...register("fnsDt")}
                />
                <FormErrorMessage>{errors?.fnsDt?.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl mt={"20px"}>
              <FormLabel>담당 직무/업무</FormLabel>
              <Input
                type={"text"}
                value={curr_role}
                placeholder="담당 직무를 입력해주세요"
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

            <FormControl
              isRequired
              isInvalid={!!errors?.description}
              mt={"20px"}
            >
              <FormLabel>근무 내용</FormLabel>
              <Textarea
                placeholder="근무 내용을 입력해주세요 (예: [삼성전자] 반도체 프로젝트를 진행했습니다...)"
                {...register("description")}
              />
              <FormErrorMessage>
                {errors?.description?.message}
              </FormErrorMessage>
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
