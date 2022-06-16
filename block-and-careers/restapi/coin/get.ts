import client from "@restapi/apiClient";
import { UserCoinReceiptEntity } from "@restapi/types/coin";
import { AxiosResponse } from "axios";

export const GetCoinByAccount = async (
  accountAddress: string
): Promise<AxiosResponse<UserCoinReceiptEntity[]>> => {
  try {
    const res = await client.get(`coin/getCoins/${accountAddress}`);
    return res;
  } catch (err) {
    throw err;
  }
};
