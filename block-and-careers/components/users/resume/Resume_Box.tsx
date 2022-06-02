import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import colors from "themes/foundations/colors";

interface Box_props {
  title: string;
  comment?: string | undefined | null;
  children: ReactNode;
}

const Resume_Box = ({ title, comment = undefined, children }: Box_props) => {
  return (
    <>
      <Heading size={"sm"}>{title}</Heading>
      {comment ? (
        <Box background={colors.blue[50]} fontSize={"sm"} padding={3}>
          {comment}
        </Box>
      ) : null}

      <Box bg={"white"}>{children}</Box>
    </>
  );
};

export default Resume_Box;
