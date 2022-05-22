import { AxiosResponse } from "axios";
import client from "../apiClient";

export interface IndustryEntity {
  id: string;
  title: string;
  createAt: Date;
  updateAt: Date;
}

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
