export interface InavItem {
  id: number;
  href: string;
  title: string;
  Icon?: string;
}

export const NavList = (): InavItem[] => {
  const navs: InavItem[] = [
    { id: 0, href: "/recruit/list", title: "채용정보" },
    { id: 1, href: "/person/list", title: "인재영입" },
    { id: 2, href: "/enterprise", title: "기업" },
    { id: 3, href: "/career", title: "경력인증" },
  ];
  return navs;
};
