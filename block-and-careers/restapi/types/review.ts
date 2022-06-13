import { BigNumber } from "ethers";

export interface Review_Item {
  id: number;
  title: string;
  content: string;
  nfturl: string;
  company: string;
  writer: string;
  createDt: BigNumber;
}
