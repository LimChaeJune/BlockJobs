import { AxiosResponse } from "axios";
import client from "../apiClient";
import { Account_Model } from "../types/account";

export const accountCheck = async (
  address: string
): Promise<AxiosResponse<Account_Model>> => {
  try {
    const res = await client.get<Account_Model>(
      `account/checkaccount/${address}`
    );
    return res;
  } catch (err) {
    throw err;
  }
};
