import { Box, Text } from "@chakra-ui/react";
import ProfileLayout from "@components/layouts/profilelayout";
import {
  Profile_Box,
  Profile_Info,
} from "@components/users/profile/Profile_Box";
import { AccountUserType, Account_Model } from "@restapi/types/account";
import { UserCoinReceiptEntity } from "@restapi/types/coin";
import { account_state, balance } from "@state/web3/account";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Token_Enterpirse = () => {
  const [accountstate] = useRecoilState<Account_Model | null>(account_state);
  const [balanceState] = useRecoilState<string | undefined>(balance);

  const [coinReceiptState] = useState<UserCoinReceiptEntity[]>();

  useEffect(() => {}, []);

  return (
    <ProfileLayout
      usertype={AccountUserType.Enterprise}
      title="토큰 정보"
      navbartitle={`${accountstate?.enterprise?.title}님`}
    >
      <Profile_Box boxTitle="지갑정보">
        <Profile_Info title="지갑 주소">
          <Link
            href={`https://rinkeby.etherscan.io/address/${accountstate?.accountAddress}`}
            passHref
          >
            <Text
              fontSize={"xl"}
              cursor={"pointer"}
              _hover={{
                textDecoration: "underline",
              }}
            >{`${accountstate?.accountAddress}`}</Text>
          </Link>
        </Profile_Info>
        <Profile_Info title="토큰 보유량">
          <Text fontSize={"xl"} fontWeight="bold">{`${balanceState} JJC`}</Text>
        </Profile_Info>
      </Profile_Box>
      <Profile_Box boxTitle="내역">
        <Box>
          {coinReceiptState?.map((receipt: UserCoinReceiptEntity, idx) => {
            return <Box>{receipt.actionDt.toLocaleDateString()}</Box>;
          })}
        </Box>
      </Profile_Box>
    </ProfileLayout>
  );
};

export default Token_Enterpirse;
