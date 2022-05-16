export interface SelectTypes {
  title: string;
  value: string;
}

export const selectList = (): SelectTypes[] => {
  const navs: SelectTypes[] = [
    { title: "기업회원", value: "Enterprise" },
    { title: "일반 사용자", value: "Customer" },
  ];
  return navs;
};
