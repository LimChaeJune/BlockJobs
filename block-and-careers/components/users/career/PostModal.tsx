import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  Box,
  Modal,
  List,
  ListItem,
  Heading,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  CloseButton,
  Spacer,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { account_state } from "@state/web3/account";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { EnterPrise_Entity } from "@restapi/types/enterprise";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import colors from "themes/foundations/colors";
import { AddUserCareer } from "@restapi/users/post";
import { Account_Model } from "@restapi/types/account";
import { GetAllEnterPrise } from "@restapi/enterprise/get";

interface IFormInput {
  roles: string;
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
  roles: yup.string().required("직무는 필수입력 내용입니다."),
  stDt: yup.date().required("근무시작 날짜는 필수입력 내용입니다."),
  fnsDt: yup.date().required("근무종료 날짜는 필수입력 내용입니다."),
});

interface modalInput {
  isOpen: boolean;
  onClose: () => void;
  completeSubmit: () => void;
}

function CareerPost({ isOpen, onClose, completeSubmit }: modalInput) {
  const [accountState] = useRecoilState<Account_Model | null>(account_state);
  const [curr_company, setCompany] = useState<EnterPrise_Entity>();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IFormInput>({ resolver: yupResolver(career_Schema) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await AddUserCareer({
      userId: accountState?.user?.id ?? "",
      description: data.description,
      companyAddress: curr_company?.account.accountAddress ?? "",
      stDt: data.stDt,
      fnsDt: data.fnsDt,
      roles: data.roles,
    })
      .then(() => {
        completeSubmit();
        reset();
        onClose();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const Click_Company = (company: EnterPrise_Entity) => {
    setCompany(company);
  };

  const closeClick = useCallback(() => {
    if (confirm("경력등록을 취소하시겠습니까?")) {
      reset();
      onClose();
    }
  }, []);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <Flex alignItems={"center"} ml={5} pt={2} pb={1}>
          <Heading fontSize={"xl"}>BlockJobs</Heading>
          <Spacer />
          <CloseButton mr={5} onClick={closeClick} />
        </Flex>
        <ModalHeader>경력 등록</ModalHeader>
        <ModalBody>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired isInvalid={curr_company === undefined}>
                <FormLabel>근무 회사</FormLabel>
                <CompanyAutoComplete
                  CompanyClick={Click_Company}
                ></CompanyAutoComplete>
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
                  placeholder="','로 구분 (예: 프론트엔드, 백엔드)"
                  {...register("roles")}
                />
                <FormErrorMessage>{errors?.roles?.message}</FormErrorMessage>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

interface companyAutoComplete {
  CompanyClick: (company: EnterPrise_Entity) => void;
}

const CompanyAutoComplete = ({ CompanyClick }: companyAutoComplete) => {
  const [currValue, setInput] = useState("");
  const [IsAutoComplete, setAutoComplete] = useState<boolean>(false);
  const [enterprises, setenterprise] = useState<EnterPrise_Entity[]>();
  const [findEnterprise, setfindEnterprise] = useState<
    EnterPrise_Entity[] | undefined
  >(enterprises);

  const InputChanged = (value: string) => {
    setInput(value);
    if (value.trim() === "") {
      setfindEnterprise(enterprises);
    } else {
      setfindEnterprise(enterprises?.filter((e) => e.title.includes(value)));
    }
  };

  const findEnter_Click = (selectValue: EnterPrise_Entity) => {
    setAutoComplete(false);
    setInput(selectValue.title);
    CompanyClick(selectValue);
  };

  useEffect(() => {
    const action = async () => {
      await GetAllEnterPrise().then((res) => {
        setenterprise(res.data);
        setfindEnterprise(res.data);
      });
    };
    action();
  }, []);

  return (
    <Box position={"relative"}>
      <Input
        value={currValue}
        onFocus={() => setAutoComplete(true)}
        onChange={(e) => InputChanged(e.target.value)}
        onBlur={() => {
          setTimeout(() => {
            setAutoComplete(false);
          }, 200);
        }}
        readOnly
      />
      {IsAutoComplete ? (
        <Box
          position={"absolute"}
          bg={"white"}
          w={"100%"}
          border={`1px solid ${colors.secondery[300]}`}
          height={"180px"}
          zIndex={20}
        >
          <List>
            {/* <ListItem>
              <Box
                height={"40px"}
                bg={colors.secondery[200]}
                padding={"5px"}
                cursor={"pointer"}
              >
                {`' ${currValue} ' 직접 입력하기`}
              </Box>
            </ListItem> */}
            {findEnterprise?.map((enter, idx) => {
              return (
                <ListItem key={idx}>
                  <Box
                    padding={"5px"}
                    width={"100%"}
                    cursor={"pointer"}
                    _hover={{ bg: colors.secondery[300] }}
                    onClick={() => findEnter_Click(enter)}
                  >
                    <Heading fontSize={"sm"}>{enter.title}</Heading>
                    <Text>{`${enter.employees}`}</Text>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>
      ) : null}
    </Box>
  );
};

export default CareerPost;
