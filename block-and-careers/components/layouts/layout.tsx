import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import NavBar from "./navbar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const BlockJobLayout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Container>
        <NavBar />
        <Box width={"100%"}>
          <Box
            width={"1060px"}
            position={"relative"}
            alignItems={"center"}
            margin={"0 auto"}
            p={"30px"}
          >
            {children}
          </Box>
        </Box>
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
 
>
`;

export default BlockJobLayout;
