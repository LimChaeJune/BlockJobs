import NavBar from "./navbar";
import styled from "styled-components";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const BlockJobLayout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Container>
        <NavBar />
        <Content>{children}</Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  display::flex;
  justify-contents:center;
  flex-direction:column;
  min-height:100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

export default BlockJobLayout;
