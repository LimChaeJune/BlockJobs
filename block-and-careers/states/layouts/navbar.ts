export interface InavItem {
  id: number;
  href: string;
  title: string;
  Icon?: string;
}

export const NavList = (): InavItem[] => {
  const navs: InavItem[] = [
    { id: 0, href: "/", title: "채용" },
    { id: 1, href: "/", title: "인재영입" },
    { id: 2, href: "/", title: "기업" },
    { id: 3, href: "/", title: "경력인증" },
  ];
  return navs;
};
