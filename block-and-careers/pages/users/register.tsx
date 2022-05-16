import { FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

enum AccountUserType {
  Customer = "Customer",
  Enterprise = "Enterprise",
}

interface RegisterAccount_Body {
  accountAddress: string;
  accountProvider: string;
  accountUserType: AccountUserType;
}

interface RegisterUser_Body {
  account: RegisterAccount_Body;
  industryId: string;
  email: string;
  name: string;
  phone: string;
}

function Register() {
  const [input, setInput] = useState<RegisterUser_Body>(null);

  return (
    <FormControl>
      <FormLabel htmlFor="email">이메일</FormLabel>
      <input id="email" type={"email"} />
    </FormControl>
  );
}

export default Register;
