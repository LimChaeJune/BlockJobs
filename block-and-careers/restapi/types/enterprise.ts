import { Account_Model, RegisterAccount_Body } from "../types/account";
import { IndustryEntity } from "./industry";

export interface EnterPrise_Entity {
  account: Account_Model;
  id: string;
  title: string;
  description: string;
  businessNumber: string;
  address: string;
  email: string;
  employees: string;
  thumbnail: string;
  createAt: Date;
  updateAt: Date;
  industry: IndustryEntity;
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

export interface UpdateEnterPriseDto {
  enterpriseId?: string;
  email?: string;
  description?: string;
  thumbnail?: string;
  address?: string;
}
