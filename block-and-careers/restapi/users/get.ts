import {
  UserCareerEntity,
  UserResumeEntity,
  User_Entity,
} from "@restapi/types/user";
import { Axios, AxiosResponse } from "axios";
import client from "../apiClient";

export const GetUserProfile = async (
  address: string
): Promise<AxiosResponse<User_Entity>> => {
  try {
    const res = await client.get<User_Entity>(address);
    return res;
  } catch (err) {
    throw err;
  }
};

export const GetUserResumes = async (
  userId: string
): Promise<AxiosResponse<UserResumeEntity[]>> => {
  try {
    const res = await client.get<UserResumeEntity[]>(`users/resume/${userId}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const GetUserByAccount = async (
  accountAddress: string
): Promise<AxiosResponse<User_Entity>> => {
  try {
    const res = await client.get<User_Entity>(`users/${accountAddress}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const GetUserCareers = async (
  userId: string
): Promise<AxiosResponse<UserCareerEntity[]>> => {
  try {
    const res = await client.get<UserCareerEntity[]>(`users/careers/${userId}`);
    return res;
  } catch (err) {
    throw err;
  }
};
