import React from "react";
import styles from "../styles/Home.module.css";

import Image from "next/image";

import {IconBrandLinkedin, IconBrandGithub} from "@tabler/icons";

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
          <div className={styles.homeLinkIcon}>
            <Image height={25} width={25} alt="icon" src="https://sean.fish/favicon.ico" />
          </div>
          <span>WEBSITE</span>
        </a>
        <a
          href="https://github.com/seanbreckenridge/"
          className={styles.darkenIcon}
          aria-label="Github"
        >
          <IconBrandGithub height={iconSize} width={iconSize} />
        </a>
      </div >
    </div >
  );
});

Header.displayName = "Header";

export default Header;
