import { User_Entity } from "./user";
import { EnterPrise_Entity } from "./enterprise";

export interface Account_Model {
  accountAddress: string;
  accountProvider: string;
  userType: AccountUserType;
  createAt: Date;
  updateAt: Date;
  user: User_Entity;
  enterprise: EnterPrise_Entity;
}

export enum AccountUserType {
  Customer = "Customer",
  Enterprise = "Enterprise",
}

export interface RegisterAccount_Body {
  accountAddress: string | null | undefined;
  // accountProvider: string | null | undefined;
  accountUserType: AccountUserType;
}
