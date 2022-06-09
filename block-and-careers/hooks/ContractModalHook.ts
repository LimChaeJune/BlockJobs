import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { boolean, string } from "yup";

export interface MetamaskError {
  code: number;
  message: string;
}

export const useContractModal = (
  props_description: string | undefined = undefined
) => {
  const { ...rest } = useDisclosure();

  // Sign기다리는
  const [isSignWait, setSignWait] = useState<boolean>(false);
  // 거절 했을 때
  const [isReject, setReject] = useState<boolean>(false);
  // transaction 주소
  const [receiptLink, setReceipt] = useState<string>("");
  // description
  const [description, setdescript] = useState<string | undefined>(
    props_description
  );

  // Sign 대기 상태로 Open
  const SignOpen = async (description: string) => {
    setSignWait(true);
    setdescript(description);
    rest.onOpen();
  };

  // Reject 대기 상태로 변경
  const RejectOpen = async (e: any) => {
    setSignWait(false);
    setdescript(e.message);
    setReject(true);
  };
  // Sign 성공 후에 상태로 변경
  const SuccessOpen = async (receiptLink: string) => {
    setSignWait(false);
    setReject(false);
    setReceipt(receiptLink);
  };

  return {
    SignOpen,
    RejectOpen,
    SuccessOpen,
    isSignWait,
    isReject,
    receiptLink,
    description,
    ...rest,
  };
};
