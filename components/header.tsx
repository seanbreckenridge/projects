import React from "react";
import styles from "../styles/Home.module.css";

import Image from "next/image";

const Header = React.memo(() => {
  return (
    <div className={styles.header}>
      <h1>Projects</h1>
      <h2>purarue</h2>
      <div className={styles.icons}>
        <a href="https://sean.fish" className={styles.homeLink}>
          <div className={styles.homeLinkIcon}>
            <Image
              height={25}
              width={25}
              alt="sean.fish sun icon"
              src="https://sean.fish/favicon.ico"
              loader={({ src }) => src}
            />
          </div>
          <span>WEBSITE</span>
        </a>
      </div>
    </div>
  );
});

Header.displayName = "Header";

export default Header;
