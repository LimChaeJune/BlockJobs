import client from "@restapi/apiClient";
import { UserCoinReceiptEntity } from "@restapi/types/coin";
import { AxiosResponse } from "axios";

export const InsertCoinRecipet = async (
  body: UserCoinReceiptEntity
): Promise<AxiosResponse> => {
  try {
    const res = await client.post("coin/insert", body);
    return res;
  } catch (err) {
    throw err;
  }
};
