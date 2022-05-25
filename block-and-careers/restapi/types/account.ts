import { User_Model } from "./user";

export interface Account_Model {
  accountAddress: string;
  accountProvider: string;
  userType: AccountUserType;
  createAt: Date;
  updateAt: Date;
  user: User_Model;
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
