import { AxiosResponse } from "axios";
import client from "../apiClient";
import {
  RegisterUser_Body,
  UserResumeEntity,
  User_Entity,
} from "../types/user";

export const RegisterUser = async (
  body: RegisterUser_Body
): Promise<AxiosResponse> => {
  try {
    const res = await client.post("users/register", body);
    return res;
  } catch (err) {
    throw err;
  }
};

export const UptUserProfile = async (
  body: User_Entity
): Promise<AxiosResponse> => {
  try {
    const res = await client.post("users/update", body);
    return res;
  } catch (err) {
    throw err;
  }
};

export const AddUserResume = async (body: UserResumeEntity) => {
  try {
    const res = await client.post("users/resume/add", body);
    return res;
  } catch (err) {
    throw err;
  }
};
