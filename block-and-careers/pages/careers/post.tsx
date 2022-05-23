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

interface IFormInput {
  roles: string[];
  description: string;
  worker: string;
  company: string;
  stDt: number;
  fnsDt: number;
}

function Post(enterprise: EnterPrise_Entity[]) {
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
    await contract
      ?.createCareer(data.company, curr_company)
      .then((res: BigNumber) => {
        console.log(ethers.utils.formatEther(res.toString()));
      });

    reset();
  };

  const TestCOntract = async () => {
    const contract = await connect();
    await contract?.BalanceOf(web3State.address).then((res: BigNumber) => {
      console.log(ethers.utils.formatEther(res.toString()));
    });
  };

  const TagEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && curr_role !== undefined) {
      console.log(e.key);
      setMyRoles([...myRoles, curr_role]);
    }
  };

  const changeTagValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrRole(e.target.value);
  };

  return (
    <Box width={"100%"}>
      <Button onClick={TestCOntract}>TEXTBUTTON</Button>
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
              <Button onClick={onOpen}>회사 검색</Button>
            </FormControl>

            <FormControl>
              <FormLabel>근무 시작일</FormLabel>
              <Input
                type={"date"}
                placeholder="근무 시작일 입력해주세요"
                {...register("stDt", {
                  required: "근무 시작일은 필수 입력 항목입니다.",
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>근무 종료일</FormLabel>
              <Input
                type={"date"}
                placeholder="근무 종료일을 입력해주세요"
                {...register("fnsDt", {
                  required: "근무 종료일은 필수 입력 항목입니다.",
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>담당 직무/업무</FormLabel>
              <Input
                type={"text"}
                placeholder="담당 했던 직무 또는 업무를 작성해주세요 (예: 프론트엔드 개발, 백엔드 개발) - 최대 5개"
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
                        <TagCloseButton />
                      </Tag>
                    );
                  })}
                </Flex>
              ) : null}
            </FormControl>

            <FormControl>
              <FormLabel>근무 내용</FormLabel>
              <Textarea />
            </FormControl>
          </form>
        </Box>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          경력 신청
        </Button>
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

export default Post;
