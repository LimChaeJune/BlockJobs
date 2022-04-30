import { NavList, InavItem } from "@state/layouts/navbar";
import Link from "next/link";
import styled from "styled-components";

const NavBar = (): JSX.Element => {
  return (
    <>
      <NavBar_Back>
        <NavBar_Items>
          {NavList().map((item: InavItem) => {
            return (
              <Link key={item.id} href={item.href} passHref>
                <NavBar_Item>{item.title}</NavBar_Item>
              </Link>
            );
          })}
        </NavBar_Items>
      </NavBar_Back>
    </>
  );
};

const NavBar_Back = styled.div`
    position: fixed;
    z-index: 9999;
    top: 0px;
    background: var(--main);
    height: 80px;
    width: 100%;    
`;

const NavBar_Items = styled.div`
    display: flex;
    display: -webkit-flex;        
    height: 100%;        
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const NavBar_Item = styled.div`
    cursor:pointer;
    font-size: var(--middle-font-size);
    color: var(--snow);        
`;

export default NavBar;
