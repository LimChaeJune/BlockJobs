import { AxiosResponse } from "axios";
import { EnterPrise_Entity } from "restapi/types/enterprise";
import client from "../apiClient";

export const GetAllEnterPrise = async (): Promise<
  AxiosResponse<EnterPrise_Entity[]>
> => {
  try {
    const res = await client.get("enterprise/all");
    return res;
  } catch (err) {
    throw err;
  }
};

export const GetEnterPriseByAccount = async (
  address: string
): Promise<AxiosResponse<EnterPrise_Entity>> => {
  try {
    const res = await client.get(`enterprise/${address}`);
    return res;
  } catch (err) {
    throw err;
  }
};
