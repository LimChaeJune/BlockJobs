import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Account_Model } from "@restapi/types/account";
import { account_state } from "@state/web3/account";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import * as yup from "yup";

interface IFormInput {
  title: string;
  content: string;
}

const career_Schema = yup.object().shape({
  title: yup
    .string()
    .required("리뷰 제목은 필수입력 내용입니다.")
    .min(10, "최소 10자 이상의 제목을 작성해주세요"),
  content: yup
    .string()
    .required("리뷰 내용은 필수입력 내용입니다..")
    .min(20, "최소 20자 이상의 내용을 작성해주세요"),
});

interface modalInput {
  isOpen: boolean;
  onClose: () => void;
  companyAddress: string | undefined;
}

const ReviewPostPopup = ({ isOpen, onClose, companyAddress }: modalInput) => {
  const [accountState] = useRecoilState<Account_Model | null>(account_state);

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IFormInput>({ resolver: yupResolver(career_Schema) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {};

  const closeClick = useCallback(() => {
    if (confirm("리뷰 등록을 취소하시겠습니까?")) {
      reset();
      onClose();
    }
  }, []);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>리뷰 등록</ModalHeader>
        <Box padding={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
              <FormLabel>리뷰 제목</FormLabel>
              <Input
                type={"title"}
                placeholder="근무 종료일을 입력해주세요"
                {...register("content")}
              />
              <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={"5px"} isRequired>
              <FormLabel>리뷰 내용</FormLabel>
              <Textarea
                minH={"200px"}
                resize={"none"}
                placeholder="근무 종료일을 입력해주세요"
                {...register("content")}
              />
              <FormErrorMessage>{errors?.content?.message}</FormErrorMessage>
            </FormControl>
          </form>
        </Box>
        <ModalFooter>
          <Button colorScheme={"blue"} marginRight={"10px"}>
            리뷰 등록
          </Button>
          <Button onClick={closeClick}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewPostPopup;
