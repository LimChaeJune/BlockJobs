import { RegisterAccount_Body } from "../types/account";
import { JobEntity } from "./job";

export interface RegisterUser_Body {
  account: RegisterAccount_Body;
  jobsId: string;
  email: string;
  name: string;
  phone: string;
}

export interface User_Entity {
  id: string;
  email: string;
  name: string;
  phone: string;
  createAt: Date;
  profile: UserProfileEntity;
  job: JobEntity[];
}

export interface UserProfileEntity {
  description: string;
  skills: string;
  userType: ProfileStatus;
  resumeFile: string;
  createAt: Date;
  updateAt: Date;
  educations: UserEducationEntity[];
  certifications: UserCertificationEntity[];
  portfolioes: UserPortfolioEntity[];
}

export interface UserEducationEntity {
  id: string;
  startDt: Date;
  fnsDt: Date;
  name: string;
  major: string;
  expreience: string;
  currentRunning: boolean;
  createAt: Date;
  updateAt: Date;
}

export interface UserCertificationEntity {
  id: string;
  getDt: Date;
  title: string;
  from: string;
  createAt: Date;
  updateAt: Date;
}

export interface UserPortfolioEntity {
  title: string;
  description: string;
  link: string;
  createAt: Date;
  updateAt: Date;
}

export enum ProfileStatus {
  JobFind = "구직중",
  JobEnteresting = "관심 있음",
  None = "관심 없음",
}
