import axios from "axios";
import { ethers } from "ethers";
import { atom, selector } from "recoil";
import { EnterPrise_Entity } from "restapi/types/enterprise";
import { GetAllEnterPrise } from "restapi/enterprise/get";

// 처음 Web3 연결 전 초기화
export const enterState = atom<EnterPrise_Entity[]>({
  key: "enterState",

  default: [],
});

export const getEnterSelector = selector<EnterPrise_Entity[]>({
  key: "enterState/get",
  get: async ({ get }) => {
    try {
      const res = await GetAllEnterPrise();
      console.log(res);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  set: ({ set }, newValue) => {
    set(enterState, newValue);
  },
});
