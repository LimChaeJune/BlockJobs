import NavBar from "./navbar";
import Footer from "./footer";
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
        <footer>
          <Footer />
        </footer>
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
