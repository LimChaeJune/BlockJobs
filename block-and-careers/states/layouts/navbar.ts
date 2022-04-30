export interface InavItem {
  id: number;
  href: string;
  title: string;
  Icon?: string;
}

export const NavList = (): InavItem[] => {
  const navs: InavItem[] = [
    { id: 0, href: "test", title: "채용" },
    { id: 1, href: "test3", title: "인재영입" },
    { id: 2, href: "test3", title: "기업" },
    { id: 3, href: "test2", title: "경력인증" },
  ];
  return navs;
};
