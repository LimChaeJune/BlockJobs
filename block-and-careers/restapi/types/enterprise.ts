import { Account_Model, RegisterAccount_Body } from "../types/account";

export interface EnterPrise_Entity {
  account: Account_Model;
  title: string;
  description: string;
  businessNumber: string;
  address: string;
  email: string;
  employees: string;
  thumbnail: string;
  createAt: Date;
  updateAt: Date;
}

export interface RegisterEnterprise_Body {
  account: RegisterAccount_Body;
  description: string;
  industryId: string;
  email: string;
  address: string;
  title: string;
  employees: string;
  businessNumber: string;
}
