import { atom, selector } from "recoil";
import { GetAllEnterPrise } from "restapi/enterprise/get";
import { Career_Item } from "@restapi/types/career";

export interface ProfileDate {
  startYear: number | undefined;
  startMonth: number | undefined;
  endYear: number | undefined;
  endMonth: number | undefined;
}

export interface UserEducationForm extends ProfileDate {
  id: number | undefined;
  name: string | undefined;
  major: string | undefined;
  expreience: string | undefined;
  currentRunning: boolean;
}

export interface UserCareerForm extends ProfileDate {
  id: number | undefined;
  company: string | undefined;
  roles: string[];
  description: string | undefined;
  currentRunning: boolean;
}

export interface UserCertificationForm {
  id: number;
  title: string;
  getYear: number | undefined;
  getMonth: number | undefined;
  from: string;
}

export interface UserPortfolioForm {
  id: number;
  title: string;
  link: string;
}

export const profile_Education = atom<UserEducationForm[]>({
  key: "educationState",

  default: [],
});

export const profile_career = atom<UserCareerForm[]>({
  key: "careerState",

  default: [],
});

export const profile_Certification = atom<UserCertificationForm[]>({
  key: "certificationState",

  default: [],
});

export const profile_Portfolio = atom<UserPortfolioForm[]>({
  key: "portfolioState",

  default: [],
});
