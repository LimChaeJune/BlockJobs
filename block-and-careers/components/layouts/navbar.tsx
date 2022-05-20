import { NavList, InavItem } from "@state/datas/navbar";
import Link from "next/link";
import { useWeb3 } from "@hooks/Web3Client";
import { link_selectpage } from "@components/utils/routing";
import { Web3_Model, initialWeb3 } from "states/web3/account";
import { useCallback, useEffect, useState } from "react";
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
import colors from "themes/foundations/colors";
import { utils } from "ethers";
import { accountCheck } from "restapi/account/accounCheck";

const NavBar = (): JSX.Element => {
  const [web3State] = useRecoilState<Web3_Model>(initialWeb3);
  const [existAccountState, setExistAccount] = useState<boolean>(false);

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

  useEffect(() => {
    const working = async () => {
      if (web3State?.network?.chainId !== 3) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: utils.hexValue(3) }],
          });
        } catch (e) {}
      }
    };
    working();
  }, [web3State.network]);

  useEffect(() => {
    const effectWorking = async () => {
      if (web3State?.address) {
        await accountCheck(web3State.address)
          .then((res) => {
            console.log(res.data);
            setExistAccount(res.data);
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    };
    effectWorking();
  }, [web3State.address]);

  // 쿠키에 로그인 정보가 있으면 바로 지갑 연결

  return (
    <Box borderBottom={`1px solid ${colors.secondery[300]}`}>
      <Flex
        paddingLeft="10%"
        paddingRight="10%"
        height="50px"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Link href={"/"}>
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
                <Button
                  _focus={{
                    border: "0px",
                  }}
                  _hover={{
                    color: `${colors.primary[400]}`,
                    border: "0px",
                  }}
                  background={"transparent"}
                >
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </LinkBox>
        <Spacer />
        <Box>
          {web3State?.address ? (
            <Menu>
              <MenuButton>
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
                <MenuList padding={"0px"}>
                  <MenuItem>My Page</MenuItem>
                  <MenuItem>프로필 정보</MenuItem>
                  <MenuDivider />
                  <MenuItem>경력 신청 현황</MenuItem>
                  <MenuItem>지원 현황</MenuItem>
                  <MenuItem>받은 제안</MenuItem>
                  <MenuDivider></MenuDivider>
                  <MenuItem
                    onClick={WalletDisConn}
                    _hover={{ background: colors.secondery[400] }}
                    background={colors.secondery[400]}
                  >
                    로그아웃
                  </MenuItem>
                </MenuList>
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

export default NavBar;
