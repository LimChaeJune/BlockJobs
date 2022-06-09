import { Box, Flex, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import colors from "themes/foundations/colors";
import shadows from "themes/foundations/shadows";
interface Box_Props {
  boxTitle: string;
  children: ReactNode;
}
export const Profile_Box = ({ boxTitle, children }: Box_Props) => {
  return (
    <Box
      w={"100%"}
      boxShadow={shadows.outline}
      padding={"3em 2em 2em 2em"}
      borderRadius={"2px"}
      background={"white"}
      position={"relative"}
      role="group"
    >
      <Heading fontSize={"lg"} mb={"1em"}>
        {boxTitle}
      </Heading>
      {children}
    </Box>
  );
};

interface Info_Props {
  title: string;
  children: ReactNode;
}

export const Profile_Info = ({ title, children }: Info_Props) => {
  return (
    <Flex w={"100%"} mb={"1em"} gap={"5px"} flexDirection={"column"}>
      <Heading fontSize={"md"} color={`${colors.secondery[500]}`}>
        {title}
      </Heading>
      {children}
    </Flex>
  );
};
