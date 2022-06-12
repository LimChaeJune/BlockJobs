import { NavList, InavItem } from "@state/datas/navbar";
import Link from "next/link";
import { useWeb3 } from "@hooks/Web3Client";
import {
  enterprise_career,
  enterprise_profile,
  link_selectpage,
  user_profile,
  user_Token,
} from "@components/utils/routing";
import { Web3_Model, initialWeb3, account_state } from "states/web3/account";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Spacer,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  LinkBox,
} from "@chakra-ui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import colors from "themes/foundations/colors";
import { utils } from "ethers";
import { accountCheck } from "restapi/account/get";
import styled from "@emotion/styled";
import { AccountUserType, Account_Model } from "restapi/types/account";

const NavBar = (): JSX.Element => {
  const [web3State] = useRecoilState<Web3_Model>(initialWeb3);
  const [existAccountState] = useRecoilState<Account_Model | null>(
    account_state
  );

  const { connect, disconnect } = useWeb3();

  const WalletConn = useCallback(async () => {
    await connect();
    // ContractState?.BalanceOf(web3State.address).then((res: BigNumber) => {
    //   console.log(ethers.utils.formatEther(res.toString()));
    //   setbalance(res);
    // });
  }, []);

  const WalletDisConn = useCallback(async () => {
    await disconnect();
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      await WalletConn();
    };
    fetchAccount();
  }, []);

  // Web3 현재 네트워크  확인
  useEffect(() => {
    const working = async () => {
      if (web3State?.network?.chainId !== 4) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: utils.hexValue(4) }],
          });
        } catch (e) {}
      }
    };
    working();
  }, [web3State.network, existAccountState]);

  return (
    <Box
      borderBottom={`1px solid ${colors.secondery[300]}`}
      height="80px"
      zIndex={"2"}
      width={"100%"}
      position={"fixed"}
      background={"white"}
    >
      <Flex mt={"5px"} height={"25px"} width={"auto"} justifyContent={"center"}>
        <Flex
          alignItems={"center"}
          border={"1px solid gray"}
          padding={"0 5px 0 5px"}
          borderRadius={"md"}
          height={"25px"}
          _hover={{ bg: colors.secondery[300], cursor: "pointer" }}
        >
          <AiOutlineCheckCircle
            style={{ color: "green", marginRight: "3px" }}
          />
          <ContractBtn
            target={"_blank"}
            rel="noopener noreferrer"
            href={
              "https://rinkeby.etherscan.io/address/0x09C0b2a052b34fDb8084B9b9E083CD0B49323005"
            }
          >
            0x09C0b2a052b34fDb8084B9b9E083CD0B49323005
          </ContractBtn>
        </Flex>
      </Flex>
      <Flex
        paddingLeft="10%"
        paddingRight="10%"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Link href={"/"} passHref>
            <Heading _hover={{ cursor: "pointer" }} fontSize="xl">
              BlockJobs
            </Heading>
          </Link>
        </Box>
        <Spacer />
        <LinkBox>
          {NavList().map((item: InavItem) => {
            return (
              <Link key={item.id} href={item.href} passHref>
                <Link_Btn>{item.title}</Link_Btn>
              </Link>
            );
          })}
        </LinkBox>
        <Spacer />
        <Box>
          {web3State?.address ? (
            <Menu>
              <MenuButton as={Box}>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  border={`1px solid ${colors.secondery[400]}`}
                  borderRadius="5%"
                  padding="5px"
                  as={Button}
                  _hover={{
                    background: colors.secondery[300],
                  }}
                >
                  <Avatar size={"sm"} marginRight={"10px"}></Avatar>
                  <Text>
                    {`${web3State?.address.slice(
                      0,
                      4
                    )}....${web3State?.address.slice(-4)}`}
                  </Text>
                </Flex>
              </MenuButton>
              {existAccountState ? (
                existAccountState.userType[0] === AccountUserType.Customer ? (
                  <MenuList padding={"0px"}>
                    <MenuItem>
                      <Link href={user_profile} passHref>
                        프로필 관리
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={user_Token} passHref>
                        토큰
                      </Link>
                    </MenuItem>
                    <MenuDivider margin={0}></MenuDivider>
                    <MenuItem
                      onClick={WalletDisConn}
                      _hover={{ background: colors.secondery[100] }}
                      background={colors.secondery[100]}
                    >
                      로그아웃
                    </MenuItem>
                  </MenuList>
                ) : (
                  <MenuList padding={"0px"}>
                    <MenuItem>
                      <Link href={enterprise_profile} passHref>
                        기업 정보 관리
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={enterprise_career} passHref>
                        신청 받은 경력
                      </Link>
                    </MenuItem>
                    <MenuDivider margin={0} />
                    <MenuItem
                      onClick={WalletDisConn}
                      _hover={{ background: colors.secondery[100] }}
                      background={colors.secondery[100]}
                    >
                      로그아웃
                    </MenuItem>
                  </MenuList>
                )
              ) : (
                <MenuList>
                  <MenuItem>
                    <Link href={link_selectpage}>회원 등록</Link>
                  </MenuItem>
                  <MenuItem onClick={WalletDisConn}>로그아웃</MenuItem>
                </MenuList>
              )}
            </Menu>
          ) : (
            <>
              <Button
                _hover={{
                  color: "teal.500",
                }}
                background=""
                onClick={WalletConn}
              >
                지갑 연결
              </Button>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

const Link_Btn = styled.span`
  font-weight: Bold;
  font-size: 16px;
  margin-left: 12px;
  cursor: pointer;
  &:hover {
    color: ${colors.highlight};
  }
`;

const ContractBtn = styled.a`
  font-weight: Bold;
  font-size: 16px;
`;

export default NavBar;
