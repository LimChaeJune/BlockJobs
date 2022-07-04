import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import colors from "../../themes/foundations/colors";
import { useBlockJobs } from "@hooks/BlockJobsContract";
import LoadingModal from "./loadingModal";
import { useContractModal } from "@hooks/ContractModalHook";
import { ethers } from "ethers";
import { numberDecimal } from "./regex";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { account_state, balance } from "@state/web3/account";
import { Account_Model } from "@restapi/types/account";

const TokenSwap = () => {
  const { BalanceOf, Buy } = useBlockJobs();

  const setBalance = useSetRecoilState<string | undefined>(balance);
  const accountState = useRecoilValue<Account_Model | null>(account_state);
  const [fromCoin] = useState<string>("ETH");
  const [toCoin] = useState<string>("BRC");
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");

  const pool = 100000;

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
      await SignOpen(`${fromCoin}을 ${toCoin}으로 스왑`);

      await Buy(fromValue.toString())
        .then(async (receipt) => {
          await SuccessOpen(receipt.transactionHash);
          // 초기화
          await setFromValue("");
          await setToValue("");
          // 토큰 수정
          await setBalance(
            ethers.utils.formatEther(
              await BalanceOf(accountState?.accountAddress)
            )
          );
        })
        .catch(async (e) => {
          await RejectOpen(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const FromValue_Changed = (e: ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
    if (parseFloat(e.target.value)) {
      const fromValue = parseFloat(e.target.value);
      const toValue = fromValue * pool;
      setToValue(toValue.toString());
    } else {
      const toValue = 0;
      setToValue(toValue.toString());
    }
  };

  return (
    <Box
      position={"relative"}
      width={{ xl: "450px", sm: "100%" }}
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
          aria-label="from-input"
          value={fromValue}
          onChange={FromValue_Changed}
          border={"none"}
          fontSize={"2xl"}
          placeholder={"0.0"}
          width={"100%"}
          onInput={numberDecimal}
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
          <Image
            src={"/images/ethereum.png"}
            width={"24px"}
            height={"24px"}
            alt="ETH"
          />
          <Text fontWeight={"bold"}>ETH</Text>
        </Flex>
      </Flex>
      {/* <Button
        position={"absolute"}
        top={"100px"}
        right={"45%"}
        border={"white 3px solid"}
      >
        <MdOutlineSwapVert fontSize={"20px"} />
      </Button> */}
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
          aria-label="to-input"
          value={toValue}
          border={"none"}
          fontSize={"2xl"}
          placeholder={"0.0"}
          width={"100%"}
          type="number"
          step="0.5"
          _focus={{ border: "none" }}
          readOnly={true}
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
            <Image
              src={"/images/racun.jpg"}
              width={"24px"}
              height={"24px"}
              alt="BJC"
            />
          </Box>
          <Text fontWeight={"bold"}>BJC</Text>
        </Flex>
      </Flex>
      <Button
        width={"100%"}
        bg={colors.blue[300]}
        mt={"10px"}
        onClick={Btn_Swap_Click}
      >
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
