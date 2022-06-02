import { BigNumber } from "ethers";

export enum CareerStatus {
  Wait = 0,
  approve = 1,
  reject = 2,
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
