import { AxiosResponse } from "axios";
import client from "../apiClient";

export const accountCheck = async (address: string): Promise<AxiosResponse> => {
  try {
    const res = await client.get(
      `http://localhost:5001/account/checkaccount/${address}`
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const accountCreate = async (
  address: string
): Promise<AxiosResponse> => {
  try {
    const res = await client.get(
      `http://localhost:5001/account/checkaccount/${address}`
    );
    return res;
  } catch (err) {
    throw err;
  }
};
