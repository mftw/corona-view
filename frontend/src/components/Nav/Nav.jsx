import React, { useTransition } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { routes } from "../Router/Router";

import styles from "./Nav.module.scss";


function Nav(props) {
  const location = useLocation();
  const { pathname } = location;
  const [startTransition, isPending] = useTransition();


  return (
    <nav className={styles.nav}>
      <ul className={styles.navbar}>
        {routes.map(({ path, exact, name }) => (
          <li key={name}>
            {path !== pathname ? (
              <NavLink className={styles.navLink} to={path} exact={exact} onClick={() => startTransition(x => x)}>
                {name}
              </NavLink>
            ) : (
              <div className={styles.navLinkActive}>{name}</div>
            )}
          </li>
        ))}
      </ul>
      {isPending ? <div className={styles.navLinkActive}>Loading...</div> : ""}
    </nav>
  );
}

export default Nav;
