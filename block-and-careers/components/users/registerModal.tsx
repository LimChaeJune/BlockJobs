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
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  phone: string;
  email: string;
  name: string;
}

interface modalInput {
  isOpen: boolean;
  onClose: () => void;
}

function Register_User({ isOpen, onClose }: modalInput) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
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
