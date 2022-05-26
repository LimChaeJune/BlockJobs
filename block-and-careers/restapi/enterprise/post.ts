import { AxiosResponse } from "axios";
import { RegisterEnterprise_Body } from "restapi/types/enterprise";
import client from "../apiClient";

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
