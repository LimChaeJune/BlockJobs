import { NavList, InavItem } from "@state/layouts/navbar";
import { BiBell } from "react-icons/bi";
import Link from "next/link";
import styled from "styled-components";
import { useWeb3 } from "@hooks/Web3Client";
import { useRecoilState } from "recoil";
import { Web3_Model, initialWeb3 } from "states/web3/account";
import { useCallback } from "react";

const NavBar = (): JSX.Element => {
  const { web3State, connect, disconnect } = useWeb3();

  const WalletConn = useCallback(() => {
    connect();
  }, []);

  const WalletDisConn = useCallback(() => {
    disconnect();
  }, []);

  return (
    <>
      <NavBar_Back>
        <NavBar_Content>
          <NavBar_Logo>BlockJobs</NavBar_Logo>
          <NavBar_Items>
            {NavList().map((item: InavItem) => {
              return (
                <Link key={item.id} href={item.href} passHref>
                  <NavBar_Item>{item.title}</NavBar_Item>
                </Link>
              );
            })}
          </NavBar_Items>
          <NavBar_UserContainer>
            {web3State?.web3Provider ? (
              <NavBar_Item
                onClick={WalletDisConn}
              >{`${web3State?.address}`}</NavBar_Item>
            ) : (
              <NavBar_Item onClick={WalletConn}>지갑 연결</NavBar_Item>
            )}
            <BiBell className="Item" />
          </NavBar_UserContainer>
        </NavBar_Content>
      </NavBar_Back>
    </>
  );
};

const NavBar_Back = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0px;
  color: ${(props) => props.theme.colors.black};
  background: ${(props) => props.theme.colors.white};
  height: 60px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.lighterGray};
  display: flex;
  display: -webkt-flex;
  align-items: center;
  justify-content: center;
`;

const NavBar_Content = styled.div`
  width: 1060px;
  display: flex;
  display: -webkt-flex;
  justify-content: space-between;
`;

const NavBar_Logo = styled.div`
  font-size: ${(props) => props.theme.fonts.middle_font_size};
  margin: 5px;
  font-weight: 800;
  cursor: pointer;
`;

const NavBar_Items = styled.div`
  display: flex;
  margin-right: 1em;
  margin-left: 1em;
`;

const NavBar_Item = styled.div`
  cursor: pointer;
  font-size: ${(props) => props.theme.fonts.middle_font_size};
  margin: 5px;
  font-weight: 500;
  &:hover {
    color: ${(props) => props.theme.colors.skyBlue};
  }
`;

const NavBar_UserContainer = styled.div`
  display: flex;
  margin-left: auto;

  .Item {
    cursor: pointer;
    font-size: 24px;
    margin: 5px;
    font-weight: 700;
  }
`;

export default NavBar;
