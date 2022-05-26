import { RegisterAccount_Body } from "../types/account";

export interface RegisterUser_Body {
  account: RegisterAccount_Body;
  jobsId: string;
  email: string;
  name: string;
  phone: string;
}

export interface User_Entity {
  id: string;
  email: string;
  name: string;
  phone: string;
  createAt: Date;
}
