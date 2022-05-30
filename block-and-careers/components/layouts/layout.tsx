import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import colors from "themes/foundations/colors";
import NavBar from "./navbar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const BlockJobLayout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Box>
        <NavBar />
        <Box width={"100%"} height={"80px"} />
        <Box
          width={"100%"}
          minHeight={"calc(100vh - 80px)"}
          bg={colors.secondery[100]}
        >
          <Box
            width={"1060px"}
            position={"relative"}
            alignItems={"center"}
            margin={"0 auto"}
            pt={"30px"}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const Container = styled.div`
  display::flex;
  justify-contents:center;
  flex-direction:column;  
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

export default BlockJobLayout;
