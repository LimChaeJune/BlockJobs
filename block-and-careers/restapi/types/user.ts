import { RegisterAccount_Body } from "../types/account";
import { JobEntity } from "./job";

export interface ProfileDate {
  startYear?: number | undefined;
  startMonth?: number | undefined;
  endYear?: number | undefined;
  endMonth?: number | undefined;
}

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
  birthday: string;
  address: string;
  male: string;
  userType: string;
  createAt?: Date;
  job: JobEntity[];
  resumes: UserResumeEntity[];
}

export interface UserResumeEntity {
  userId?: string;
  resumeId: string;
  title?: string;
  description?: string;
  skills?: string;
  educations?: UserEducationEntity[];
  certifications?: UserCertificationEntity[];
  portfolioes?: UserPortfolioEntity[];
  careers?: UserCareerEntity[];
}

export interface UserEducationEntity extends ProfileDate {
  id: string;
  fnsDt?: Date;
  name?: string | undefined;
  major?: string | undefined;
  expreience?: string | undefined;
  currentRunning: boolean;
  createAt?: Date;
  updateAt?: Date;
  resumeId?: string;
}

export interface UserCertificationEntity {
  id: string;
  getYear?: number;
  getMonth?: number;
  title?: string;
  from?: string;
  createAt?: Date;
  updateAt?: Date;
  resumeId?: string;
}

export interface UserPortfolioEntity {
  id: string;
  title?: string;
  description?: string;
  link?: string;
  createAt?: Date;
  updateAt?: Date;
  resumeId?: string;
}

export interface UserCareerEntity extends ProfileDate {
  id: string;
  startDt?: Date;
  fnsDt?: Date;
  companyAddress?: string;
  description?: string;
  roles?: string;
  currentRunning: boolean;
  createAt?: Date;
  updateAt?: Date;
  resumeId?: string;
}

export enum ProfileStatus {
  JobFind = "구직중",
  JobEnteresting = "관심 있음",
  None = "관심 없음",
}
