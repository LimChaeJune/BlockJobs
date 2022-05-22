import { AxiosResponse } from "axios";
import client from "../apiClient";

export interface JobEntity {
  id: string;
  title: string;
  level: number;
  parentId: string;
  createAt: Date;
  updateAt: Date;
}

export const GetRootJobs = async (): Promise<AxiosResponse<JobEntity[]>> => {
  try {
    const res = await client.get<JobEntity[]>("job");
    return res;
  } catch (err) {
    throw err;
  }
};

export const GetJobsByParentId = async (
  parentId: string
): Promise<AxiosResponse> => {
  try {
    const res = await client.get(`job/${parentId}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const GetJobsByLevel = async (level: number): Promise<AxiosResponse> => {
  try {
    const res = await client.get(`job/${level}`);
    return res;
  } catch (err) {
    throw err;
  }
};
