import { AxiosResponse } from "axios";
import client from "../apiClient";

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

export const RegisterUser = async (
  body: RegisterUser_Body
): Promise<AxiosResponse> => {
  try {
    const res = await client.post("/register", body);
    return res;
  } catch (err) {
    throw err;
  }
};
