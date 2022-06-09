export enum CoinType {
  Get = "수익",
  Set = "소비",
}

export interface UserCoinReceiptEntity {
  accountAddress: string;
  id: string;
  description?: string;
  link?: string;
  cointype?: CoinType;
  actionDt: Date;
}
