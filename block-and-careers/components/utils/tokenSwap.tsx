import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineSwapVert } from "react-icons/md";
import ethereum from "../../public/images/ethereum.png";
import racun from "../../public/images/racun.jpg";
import shadows from "themes/foundations/shadows";
import Image from "next/image";
import colors from "themes/foundations/colors";
import { useBlockJobs } from "@hooks/BlockJobsContract";
import LoadingModal from "./loadingModal";
import { useContractModal } from "@hooks/ContractModalHook";
import { ethers } from "ethers";

const TokenSwap = () => {
  const { BalanceOf, Sell, Buy } = useBlockJobs();

  const [fromCoin, setFromCoin] = useState<string>();
  const [toCoin, setToCoin] = useState<string>();
  const [fromValue, setFromValue] = useState<number>();
  const [toValue, setToValue] = useState<number>();

  const {
    isOpen,
    isReject,
    isSignWait,
    receiptLink,
    description,
    onClose,
    SignOpen,
    RejectOpen,
    SuccessOpen,
  } = useContractModal();

  const Btn_Swap_Click = async () => {
    try {
      await SignOpen(`${career.companyAddress}에게 경력 검증 신청`);

      await Buy(ethers.utils.parseEther(fromValue)));
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Box
      position={"relative"}
      width={"450px"}
      shadow={"xl"}
      borderRadius={"xl"}
      padding={"20px"}
    >
      <Flex
        bg={"#F7F4F8"}
        height={"100px"}
        paddingBottom={"10px"}
        pt={"50px"}
        borderRadius={"xl"}
        _hover={{ border: "gray 1px solid" }}
      >
        <Input
          value={fromValue}
          border={"none"}
          fontSize={"2xl"}
          placeholder={"0.0"}
          width={"100%"}
          _focus={{ border: "none" }}
        />
        <Flex
          shadow={"xl"}
          width={"100px"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"40px"}
          background={"#F5F4F8"}
          borderRadius={"xl"}
          marginRight={"10px"}
          gap={"10px"}
        >
          <Image src={ethereum} width={"24px"} height={"24px"} />
          <Text fontWeight={"bold"}>ETH</Text>
        </Flex>
      </Flex>
      <Button
        position={"absolute"}
        top={"100px"}
        right={"45%"}
        border={"white 3px solid"}
      >
        <MdOutlineSwapVert fontSize={"20px"} />
      </Button>
      <Flex
        marginTop={"10px"}
        bg={"#F7F4F8"}
        height={"70px"}
        pt={"20px"}
        pb={"20px"}
        borderRadius={"xl"}
        _hover={{ border: "gray 1px solid" }}
      >
        <Input
          value={fromValue}
          border={"none"}
          fontSize={"2xl"}
          placeholder={"0.0"}
          width={"100%"}
          _focus={{ border: "none" }}
        />
        <Flex
          shadow={"xl"}
          width={"100px"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"40px"}
          background={"#F5F4F8"}
          borderRadius={"xl"}
          marginRight={"10px"}
          gap={"10px"}
        >
          <Box
            height={"24px"}
            width={"24px"}
            borderRadius={"50%"}
            border={"1px"}
            overflow={"hidden"}
          >
            <Image src={racun} width={"24px"} height={"24px"} />
          </Box>
          <Text fontWeight={"bold"}>BJC</Text>
        </Flex>
      </Flex>
      <Button width={"100%"} bg={colors.blue[300]} mt={"10px"} onClick={}>
        스왑
      </Button>

      <LoadingModal
        isOpen={isOpen}
        onClose={onClose}
        isSignWait={isSignWait}
        isReject={isReject}
        description={description}
        reciptLink={receiptLink}
      />
    </Box>
  );
};

export default TokenSwap;
