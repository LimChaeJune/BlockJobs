export enum CoinType {
  Get = "μμ΅",
  Set = "μλΉ",
}

export interface UserCoinReceiptEntity {
  accountAddress: string;
  id: string;
  description?: string;
  link?: string;
  cointype?: CoinType;
  actionDt: Date;
}
