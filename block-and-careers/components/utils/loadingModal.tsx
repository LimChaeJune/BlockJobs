import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Description } from "@ethersproject/properties";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { BsArrowUpCircle } from "react-icons/bs";
import colors from "themes/foundations/colors";

interface modalInput {
  isSignWait: boolean;
  isReject: boolean;
  description: string | undefined;
  reciptLink: string;
  isOpen: boolean;
  onClose: () => void;
}

const LoadingModal = ({
  isSignWait,
  isOpen,
  isReject,
  description,
  reciptLink,
  onClose,
}: modalInput) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size={"md"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody paddingBottom={"0px"}>
          <Flex
            height={"350px"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={"20px"}
          >
            {isSignWait ? (
              <>
                <Spinner
                  thickness="4px"
                  speed="1s"
                  color={colors.blue[400]}
                  height={"100px"}
                  width={"100px"}
                />
                <Text fontSize={"xl"}>확인을 기다리는 중</Text>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  {description}
                </Text>
                <Text>지갑에서 이 거래를 확인하세요</Text>
              </>
            ) : isReject ? (
              <>
                <Icon
                  as={AiOutlineWarning}
                  color={colors.red[400]}
                  fontSize={"80px"}
                />
                <Text
                  textAlign={"center"}
                  fontSize={"md"}
                  color={colors.red[300]}
                  cursor={"pointer"}
                >
                  {description}
                </Text>
                <Button
                  width={"100%"}
                  color={colors.white}
                  background={colors.red[300]}
                  onClick={() => onClose()}
                >
                  닫기
                </Button>
              </>
            ) : (
              <>
                <Icon
                  as={BsArrowUpCircle}
                  color={colors.blue[400]}
                  fontSize={"80px"}
                />
                <Text> 제출된 거래</Text>
                <Link
                  href={`https://rinkeby.etherscan.io/tx/${reciptLink}`}
                  passHref
                >
                  <a target={"_blank"} rel="noopener noreferrer">
                    <Text
                      fontSize={"sm"}
                      color={colors.blue[400]}
                      cursor={"pointer"}
                    >
                      EtherScan에서 확인
                    </Text>
                  </a>
                </Link>
                <Button
                  width={"100%"}
                  color={colors.white}
                  background={colors.blue[300]}
                  onClick={() => onClose()}
                >
                  닫기
                </Button>
              </>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;
