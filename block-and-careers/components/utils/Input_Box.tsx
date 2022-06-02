import {
  Box,
  BoxProps,
  Input,
  InputProps,
  Text,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { useState } from "react";
import colors from "themes/foundations/colors";

interface Input_Box_props extends InputProps {
  title: string;
  boxProps?: BoxProps;
}

interface TextArea_Box_props extends TextareaProps {
  title: string;
}

const Input_Box = ({ title, boxProps, ...rest }: Input_Box_props) => {
  const [isFocus, setFocus] = useState<boolean>(false);

  return (
    <Box
      border={
        isFocus
          ? `1px solid ${colors.blue[500]}`
          : `1px solid ${colors.secondery[300]}`
      }
      borderRadius={"sm"}
      pt={1}
      pb={1}
      pl={2}
      {...boxProps}
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

const TextArea_Box = ({ title, ...rest }: TextArea_Box_props) => {
  const [isFocus, setFocus] = useState<boolean>(false);

  return (
    <Box
      flex={1}
      border={
        isFocus
          ? `1px solid ${colors.blue[500]}`
          : `1px solid ${colors.secondery[300]}`
      }
      borderRadius={"sm"}
      pt={1}
      pl={2}
    >
      <Text color={colors.secondery[400]} fontSize={"sm"}>
        {title}
      </Text>

      <Textarea
        resize={"none"}
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

export { Input_Box, TextArea_Box };
