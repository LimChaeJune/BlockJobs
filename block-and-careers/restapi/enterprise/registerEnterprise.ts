import { AxiosResponse } from "axios";
import { RegisterAccount_Body } from "restapi/users/registerUser";
import client from "../apiClient";

export interface RegisterEnterprise_Body {
  account: RegisterAccount_Body;
  description: string;
  industryId: string;
  email: string;
  address: string;
  title: string;
  employees: string;
  businessNumber: string;
}

export const RegisterEnterprise = async (
  body: RegisterEnterprise_Body
): Promise<AxiosResponse> => {
  try {
    const res = await client.post("enterprise/register", body);
    return res;
  } catch (err) {
    throw err;
  }
};
