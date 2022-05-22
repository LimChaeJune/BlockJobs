import { AxiosResponse } from "axios";
import client from "../apiClient";

export enum AccountUserType {
  Customer = "Customer",
  Enterprise = "Enterprise",
}

export interface RegisterAccount_Body {
  accountAddress: string | null | undefined;
  // accountProvider: string | null | undefined;
  accountUserType: AccountUserType;
}

export interface RegisterUser_Body {
  account: RegisterAccount_Body;
  jobsId: string;
  email: string;
  name: string;
  phone: string;
}

export const RegisterUser = async (
  body: RegisterUser_Body
): Promise<AxiosResponse> => {
  try {
    const res = await client.post("users/register", body);
    return res;
  } catch (err) {
    throw err;
  }
};
