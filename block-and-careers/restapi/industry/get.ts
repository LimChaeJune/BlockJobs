import { IndustryEntity } from "@restapi/types/industry";
import { AxiosResponse } from "axios";
import client from "../apiClient";


export const GetIndustry = async (): Promise<
  AxiosResponse<IndustryEntity[]>
> => {
  try {
    const res = await client.get<IndustryEntity[]>("industry");
    return res;
  } catch (err) {
    throw err;
  }
};
