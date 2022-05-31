import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  InputProps,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import colors from "themes/foundations/colors";
import { Profile_Box } from "../profile";

const ResumeEdit = () => {
  const [focusState, setFocus] = useState<string>("");

  return (
    <Flex flexDirection={"column"} gap={5}>
      <Input bg={"white"} fontSize={"2xl"} height={"70px"}></Input>

      <Resume_Box title="인적사항">
        <Flex gap={3} margin={3} justifyContent={"between"}>
          <Input_Box title="이름" type={"text"} />
          <Input_Box title="전화번호" />
          <Input_Box title="이메일" />
        </Flex>
      </Resume_Box>

      <Resume_Box title="자기 소개">
        <Textarea />
      </Resume_Box>

      <Resume_Box title="학력">
        <Button color={colors.highlight} background={"transparent"}>
          추가 +
        </Button>
        <Flex gap={3} margin={3} justifyContent={"between"}></Flex>
      </Resume_Box>
    </Flex>
  );
};

interface Box_props {
  title: string;
  children: ReactNode;
}

const Resume_Box = ({ title, children }: Box_props) => {
  return (
    <>
      <Heading size={"sm"}>{title}</Heading>
      <Box bg={"white"}>{children}</Box>
    </>
  );
};

interface Input_Box_props extends InputProps {
  title: string;
}

const Input_Box = ({ title, ...rest }: Input_Box_props) => {
  const [isFocus, setFocus] = useState<boolean>(false);

  return (
    <Box
      border={isFocus ? `1px solid ${colors.blue[500]}` : "1px solid gray"}
      pt={1}
      pb={1}
      pl={2}
    >
      <Text color={colors.secondery[400]} fontSize={"sm"}>
        {title}
      </Text>

      <Input
        border={"none"}
        pl={0}
        _active={{ border: "none" }}
        _focus={{ border: "none" }}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        {...rest}
      />
    </Box>
  );
};

export default ResumeEdit;
