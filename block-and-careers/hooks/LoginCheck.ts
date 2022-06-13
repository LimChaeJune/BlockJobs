import { link_selectpage, link_unAuthorize } from "@components/utils/routing";
import { AccountUserType, Account_Model } from "@restapi/types/account";
import { useRouter } from "next/router";

export const useUserLogin = () => {
  const route = useRouter();

  const IsLoginCheck = () => {
    var getSession = sessionStorage.getItem("account");

    if (!getSession || getSession.trim() === "") {
      route.push(link_selectpage);
    }
    return !!getSession;
  };

  // 일반 사용자인지 체크
  const IsCustomer = () => {
    IsLoginCheck();

    var getSession = sessionStorage.getItem("account");
    if (getSession) {
      const value: Account_Model = JSON.parse(getSession);
      if (value.userType.toString() !== AccountUserType.Customer.toString()) {
        route?.push("/common/unauthpage");
      }
    }
  };

  // 기업 사용자인지 체크
  const IsEnterprise = () => {
    var getSession = sessionStorage.getItem("account");
    if (getSession) {
      const value: Account_Model = JSON.parse(getSession);
      if (value.userType.toString() !== AccountUserType.Enterprise.toString()) {
        route?.push("/common/unauthpage");
      }
    }
  };

  return { IsLoginCheck, IsCustomer, IsEnterprise };
};
