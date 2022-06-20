import { Input, InputProps } from "@chakra-ui/react";
import { numberonly } from "./regex";

const DateInput = ({ ...rest }: InputProps) => {
  return (
    <Input
      type={"text"}
      onInput={numberonly}
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
