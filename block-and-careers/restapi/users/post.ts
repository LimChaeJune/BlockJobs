import { AxiosResponse } from "axios";
import client from "../apiClient";
import { RegisterUser_Body } from "../types/user";

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
