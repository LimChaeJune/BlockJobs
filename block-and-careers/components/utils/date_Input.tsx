import { Input, InputProps } from "@chakra-ui/react";
import { numberonly } from "./regex";

interface input_props extends InputProps {}

const DateInput = ({ ...rest }: input_props) => {
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
