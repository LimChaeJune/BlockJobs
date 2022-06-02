import { Input, InputProps } from "@chakra-ui/react";

interface input_props extends InputProps {}

const DateInput = ({ ...rest }: input_props) => {
  return (
    <Input
      type={"number"}
      width={"50px"}
      padding={0}
      border={"none"}
      _active={{ border: "none" }}
      _focus={{ border: "none" }}
      textAlign={"center"}
      {...rest}
    />
  );
};

export default DateInput;
