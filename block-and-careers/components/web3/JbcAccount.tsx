import { Web3_Model, initialWeb3, balance } from "states/web3/account";
import { useRecoilState } from "recoil";
import { Box, Flex } from "@chakra-ui/react";
import { useBlockJobs } from "@hooks/BlockJobsContract";
import { useEffect } from "react";

// 생성한 JBC 코인 어카운트 관리
const JBCAccount = (): JSX.Element => {
  const [accountWeb3] = useRecoilState(initialWeb3);
  const [balanceState] = useRecoilState(balance);

  return (
    <Box>
      <Flex>
        <Box fontSize={"xl"}>{accountWeb3.address}</Box>
        <Box fontSize={"xl"}>{`BJC 보유량 : ${balanceState}`}</Box>
      </Flex>
    </Box>
  );
};

export default JBCAccount;
