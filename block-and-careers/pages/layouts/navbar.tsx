import { NavList, InavItem } from "@state/layouts/navbar";
import Link from "next/link";
import styles from "styles/layout/navbar.module.scss";

const NavBar = (): JSX.Element => {
  return (
    <>
      <div className={styles.NavBar}>
        <div className={styles.NavBar_Items}>
          {NavList().map((item: InavItem) => {
            return (
              <Link key={item.id} href={item.href}>
                <div className={styles.NavList}>{item.title}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NavBar;
