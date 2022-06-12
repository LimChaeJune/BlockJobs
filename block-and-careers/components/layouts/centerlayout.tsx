import { Box } from "@chakra-ui/react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const CenterLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      width={{ xl: "1060px", md: "100%" }}
      position={"relative"}
      alignItems={"center"}
      margin={"0 auto"}
      pt={"30px"}
    >
      {children}
    </Box>
  );
};
export default CenterLayout;
