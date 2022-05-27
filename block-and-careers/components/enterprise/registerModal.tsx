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
  Textarea,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EnterpriseEmployees, GetEmployees } from "@state/datas/enterprisetype";
import { IndustryEntity } from "restapi/industry/get";
import { useRouter } from "next/router";
import { RegisterEnterprise } from "@restapi/enterprise/post";
import { RegisterEnterprise_Body } from "@restapi/types/enterprise";
import { AccountUserType } from "@restapi/types/account";
import { useRecoilState } from "recoil";
import { initialWeb3, Web3_Model } from "@state/web3/account";
import { useCallback } from "react";

interface IFormInput {
  title: string;
  description: string;
  address: string;
  businessNumber: string;
  employees: string;
  industryId: string;
  email: string;
  thumbnail: string;
}

interface modalInput {
  isOpen: boolean;
  onClose: () => void;
  rootIndustry: IndustryEntity[];
}

function Register_Enterprise({ isOpen, onClose, rootIndustry }: modalInput) {
  const router = useRouter();
  const [web3State] = useRecoilState<Web3_Model>(initialWeb3);
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
    const RegisterEnter_Body: RegisterEnterprise_Body = {
      email: data.email,
      industryId: data.industryId,
      title: data.title,
      description: data.description,
      address: data.address,
      employees: data.employees,
      businessNumber: data.businessNumber,
      account: {
        accountAddress: web3State?.address,
        accountUserType: AccountUserType.Enterprise,
      },
    };
    console.log(RegisterEnter_Body);
    const res = await RegisterEnterprise(RegisterEnter_Body);
    console.log(res);
    if (res.status == 200) {
      alert(
        "사용자 생성을 완료했습니다.\r BlockJobs 서비스를 이용하실 수 있습니다."
      );
      router.push("/");
    } else {
      alert(res.data);
    }
  };

  const enterSizes: EnterpriseEmployees[] = GetEmployees();

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
        <ModalHeader>기업 등록</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors.title !== undefined}>
              <FormLabel htmlFor="title">회사 이름</FormLabel>
              <Input
                id="title"
                placeholder="회사 이름을 입력해주세요"
                type={"text"}
                {...register("title", {
                  required: "회사이름은 필수 입력 항목입니다.",
                  minLength: 2,
                  maxLength: 10,
                })}
              />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={errors.description !== undefined}
              mt={3}
            >
              <FormLabel htmlFor="description">회사 정보</FormLabel>
              <Textarea
                id="description"
                placeholder="회사 정보를 입력해주세요"
                {...register("description", {
                  required: "회사 정보는 필수 입력 항목입니다.",
                })}
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={3}>
              <FormLabel htmlFor="email">대표 이메일</FormLabel>
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
              <FormLabel htmlFor="address">대표 주소</FormLabel>
              <Input
                id="address"
                placeholder="주소를 입력해주세요"
                type={"address"}
                {...register("address", {
                  required: "주소는 필수 입력 항목입니다.",
                })}
              />
              <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={3}>
              <FormLabel htmlFor="employees">회사 규모</FormLabel>
              <Select
                {...register("employees", {
                  required: "회사규모는 필수 입력 항목입니다.",
                })}
              >
                {enterSizes.map((value: EnterpriseEmployees, idx) => {
                  return (
                    <option key={idx} value={value.value}>
                      {value.title}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>{errors.employees?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={3}>
              <FormLabel htmlFor="industryId">산업군</FormLabel>
              <Select
                {...register("industryId", {
                  required: "산업군은 필수 입력 항목입니다.",
                })}
              >
                {rootIndustry?.map((value: IndustryEntity, idx) => {
                  return (
                    <option key={idx} value={value.id}>
                      {value.title}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>{errors.industryId?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={3}>
              <FormLabel htmlFor="businessNumber">사업자 번호</FormLabel>
              <Input
                id="businessNumber"
                placeholder="(예시) 123-45-67890"
                {...register("businessNumber", {
                  required: "사업자 번호는 필수 입력 항목입니다.",
                })}
              />
              <FormErrorMessage>
                {errors.businessNumber?.message}
              </FormErrorMessage>
            </FormControl>

            <ModalFooter>
              <Button mt={4} isLoading={isSubmitting} type="submit">
                기업 등록
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Register_Enterprise;
