import { AxiosResponse } from "axios";
import client from "../apiClient";
import {
  CreateCareerDto,
  RegisterUser_Body,
  UpdateCareerDto,
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

export const AddUserCareer = async (body: CreateCareerDto) => {
  try {
    console.log(body);
    const res = await client.post("users/career", body);
    return res;
  } catch (err) {
    throw err;
  }
};

export const UpdateUserCareer = async (body: UpdateCareerDto) => {
  try {
    const res = await client.post("users/career/update", body);
    return res;
  } catch (err) {
    throw err;
  }
};
