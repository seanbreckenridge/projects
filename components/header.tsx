import React from "react";
import styles from "../styles/Home.module.css";

import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons";

const Header = React.memo(() => {
  const iconSize = 40;
  return (
    <div className={styles.header}>
      <h1>Projects</h1>
      <h2>Sean Breckenridge</h2>
      <div className={styles.icons}>
        <a
          href="https://www.linkedin.com/in/sean-breckenridge/"
          className={styles.darkenIcon}
          aria-label="LinkedIn"
        >
          <IconBrandLinkedin height={iconSize} width={iconSize} />
        </a>
        <a href="https://sean.fish" className={styles.homeLink}>
          <img height={25} alt="" width="auto" src="/favicon.ico" />
          <span>WEBSITE</span>
        </a>
        <a
          href="https://github.com/seanbreckenridge/"
          className={styles.darkenIcon}
          aria-label="Github"
        >
          <IconBrandGithub height={iconSize} width={iconSize} />
        </a>
      </div>
    </div>
  );
});

export default Header;
