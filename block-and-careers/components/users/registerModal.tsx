import {
  Button,
  CloseButton,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { initialWeb3, Web3_Model } from "@state/web3/account";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { JobEntity } from "restapi/jobs/get";
import {
  AccountUserType,
  RegisterUser,
  RegisterUser_Body,
} from "restapi/users/post";

interface IFormInput {
  phone: string;
  email: string;
  name: string;
  jobsId: string;
}

interface modalInput {
  isOpen: boolean;
  onClose: () => void;
  rootJobs: JobEntity[];
}

function Register_User({ isOpen, onClose, rootJobs }: modalInput) {
  const [web3State] = useRecoilState<Web3_Model>(initialWeb3);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const closeClick = useCallback(() => {
    if (confirm("회원등록을 취소하시겠습니까?")) {
      reset();
      onClose();
    }
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const RegisterUser_Body: RegisterUser_Body = {
      email: data.email,
      jobsId: data.jobsId,
      name: data.name,
      phone: data.phone,
      account: {
        accountAddress: web3State?.address,
        accountUserType: AccountUserType.Customer,
      },
    };
    console.log(RegisterUser_Body);
    const res = await RegisterUser(RegisterUser_Body);
    console.log(res);
    if (res.status == 200) {
      alert(
        "사용자 생성을 완료했습니다.\r BlockJobs 서비스를 이용하실 수 있습니다."
      );
      router.push("/");
    }
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Flex alignItems={"center"} ml={5} pt={2} pb={1}>
          <Heading fontSize={"xl"}>BlockJobs</Heading>
          <Spacer />
          <CloseButton mr={5} onClick={closeClick} />
        </Flex>
        <Divider />
        <ModalHeader>회원등록</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors.name !== undefined}>
              <FormLabel htmlFor="name">이름</FormLabel>
              <Input
                id="name"
                placeholder="이름을 입력해주세요"
                type={"text"}
                {...register("name", {
                  required: "email은 필수 입력 항목입니다.",
                  minLength: 2,
                  maxLength: 10,
                })}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={3}>
              <FormLabel htmlFor="email">이메일</FormLabel>
              <Input
                id="email"
                placeholder="email을 입력해주세요"
                type={"email"}
                {...register("email", {
                  required: "email은 필수 입력 항목입니다.",
                })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={3}>
              <FormLabel htmlFor="phone">휴대폰 번호</FormLabel>
              <Input
                id="phone"
                placeholder="(예시) 01068617798"
                {...register("phone", {
                  required: "휴대폰 번호는 필수 입력 항목입니다.",
                })}
              />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={3}>
              <FormLabel htmlFor="jobsId">직무</FormLabel>
              <Flex>
                <Select
                  id="jobsId"
                  {...register("jobsId", {
                    required: "산업군은 필수 입력 항목입니다.",
                  })}
                >
                  {rootJobs?.map((value: JobEntity, idx) => {
                    return (
                      <option key={idx} value={value.id}>
                        {value.title}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>

            <ModalFooter>
              <Button mt={4} isLoading={isSubmitting} type="submit">
                회원 정보 등록
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Register_User;
