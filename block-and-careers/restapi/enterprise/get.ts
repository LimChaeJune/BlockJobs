import { Account_Model } from "../types/account";

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
