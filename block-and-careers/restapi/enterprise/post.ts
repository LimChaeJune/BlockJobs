import { AxiosResponse } from "axios";
import {
  RegisterEnterprise_Body,
  UpdateEnterPriseDto,
} from "restapi/types/enterprise";
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

export const UpdateEnterprise = async (body: UpdateEnterPriseDto) => {
  try {
    const res = await client.put("enterprise/update", body);
    return res;
  } catch (err) {
    throw err;
  }
};
