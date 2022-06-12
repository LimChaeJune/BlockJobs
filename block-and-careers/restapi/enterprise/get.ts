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

export const GetEnterPriseById = async (
  id: string | string[]
): Promise<AxiosResponse<EnterPrise_Entity>> => {
  try {
    const res = await client.get(`enterprise/byid/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};
