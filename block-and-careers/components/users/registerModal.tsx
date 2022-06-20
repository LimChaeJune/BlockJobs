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
import { RegisterUser } from "restapi/users/post";

import { AccountUserType } from "restapi/types/account";
import { RegisterUser_Body } from "restapi/types/user";
import { autoHyphen } from "@components/utils/regex";
import { useWeb3 } from "@hooks/Web3Client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBlockJobs } from "@hooks/BlockJobsContract";
import { useContractModal } from "@hooks/ContractModalHook";
import LoadingModal from "@components/utils/loadingModal";

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

const user_register_schema = yup.object().shape({
  name: yup
    .string()
    .required("이름은 필수입력 내용입니다.")
    .min(2, "이름은 최소 2자 입니다.")
    .max(1000, "이름은 최대 10자 입니다."),
  email: yup.string().required("이메일은 필수입력 내용입니다."),
  phone: yup.string().required("핸드폰 번호는 필수입력 내용입니다."),
});

function Register_User({ isOpen, onClose, rootJobs }: modalInput) {
  const [web3State] = useRecoilState<Web3_Model>(initialWeb3);
  const { setAccountExist } = useWeb3();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({ resolver: yupResolver(user_register_schema) });
  const { approveUser } = useBlockJobs();
  const {
    isOpen: isOpenContractModal,
    onClose: onCloseContractModal,
    receiptLink,
    isSignWait,
    isReject,
    description,
    SignOpen,
    RejectOpen,
  } = useContractModal();

  const closeClick = useCallback(() => {
    if (confirm("회원등록을 취소하시겠습니까?")) {
      reset();
      onClose();
    }
  }, [reset, onClose]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("?");
    await SignOpen("BJC 토큰 Approve");

    await approveUser(10000)
      .then(async () => {
        await onCloseContractModal();
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
        await RegisterUser(RegisterUser_Body)
          .then(async () => {
            await setAccountExist().then(() => {
              alert(
                "사용자 생성을 완료했습니다.\r BlockJobs 서비스를 이용하실 수 있습니다."
              );
              router.push("/");
            });
          })
          .catch((ex) => {
            reset();
            onClose();
            alert(ex.response.data.message);
          });
      })
      .catch(async (e) => {
        await RejectOpen(e);
      });
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
                {...register("name")}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={3} isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">이메일</FormLabel>
              <Input
                id="email"
                placeholder="email을 입력해주세요"
                type={"email"}
                {...register("email")}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={3} isInvalid={!!errors.phone}>
              <FormLabel htmlFor="phone">휴대폰 번호</FormLabel>
              <Input
                maxLength={13}
                id="phone"
                onInput={autoHyphen}
                placeholder="(예시) 010-6861-7798"
                {...register("phone")}
              />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={3}>
              <FormLabel htmlFor="jobsId">직무</FormLabel>
              <Flex>
                <Select id="jobsId" {...register("jobsId")}>
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
      <LoadingModal
        isSignWait={isSignWait}
        isReject={isReject}
        reciptLink={receiptLink}
        description={description}
        isOpen={isOpenContractModal}
        onClose={onCloseContractModal}
      />
    </Modal>
  );
}

export default Register_User;
