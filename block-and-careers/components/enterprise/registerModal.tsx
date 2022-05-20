import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EnterpriseEmployees, GetEmployees } from "@state/datas/enterprisetype";

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
}

function Register_Enterprise({ isOpen, onClose }: modalInput) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const enterSizes: EnterpriseEmployees[] = GetEmployees();

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>기업 등록</ModalHeader>
        <ModalCloseButton />
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
                  required: "address 필수 입력 항목입니다.",
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
