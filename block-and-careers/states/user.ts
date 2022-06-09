import { atom, selector } from "recoil";
import {
  UserCareerEntity,
  UserCertificationEntity,
  UserEducationEntity,
  UserPortfolioEntity,
  UserResumeEntity,
} from "@restapi/types/user";
import { GetUserResumes } from "@restapi/users/get";
import { account_state } from "./web3/account";

export const resumeState = atom<UserResumeEntity[]>({
  key: "userResumeState",
  default: [],
});

export const getResumeSelector = selector<UserResumeEntity[]>({
  key: "userResumeState/get",
  get: async ({ get }) => {
    try {
      const account = get(account_state);
      const res = await GetUserResumes(account?.user.id ?? "");
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  set: ({ set }, newValue) => {
    set(resumeState, newValue);
  },
});

// 회원 등록되지 않은 지갑
export const newIdState = atom<boolean>({
  key: "newIdState",

  default: true,
});

export const profile_Education = atom<UserEducationEntity[]>({
  key: "educationState",

  default: [],
});

export const profile_Certification = atom<UserCertificationEntity[]>({
  key: "certificationState",

  default: [],
});

export const profile_Portfolio = atom<UserPortfolioEntity[]>({
  key: "portfolioState",

  default: [],
});
