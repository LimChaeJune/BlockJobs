export interface EnterpriseEmployees {
  title: string;
  value: string;
}

export const GetEmployees = (): EnterpriseEmployees[] => {
  const dt: EnterpriseEmployees[] = [
    { title: "50명 이하", value: "50명 이하" },
    { title: "50명 ~ 100명 미만", value: "50명 ~ 100명 미만" },
    { title: "100명 ~ 150명 미만", value: "100명 ~ 150명 미만" },
    { title: "150명 ~ 200명 미만", value: "150명 ~ 200명 미만" },
  ];
  return dt;
};
