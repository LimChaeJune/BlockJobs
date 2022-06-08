import { BigNumber } from "ethers";

export enum CareerStatus {
  대기중 = 0,
  승인 = 1,
  거절 = 2,
}

export interface Career_Item {
  id: number;
  roles: string[];
  description: string;
  worker: string;
  company: string;
  stDt: BigNumber;
  fnsDt: BigNumber;
  status: CareerStatus;
}
