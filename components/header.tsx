import React from "react";
import styles from "../styles/Home.module.css";

import Image from "next/image";

const Header = React.memo(() => {
  return (
    <div className={styles.header}>
      <h1>Projects</h1>
      <h2>purarue</h2>
      <div className={styles.icons}>
        <a href="https://purarue.xyz" className={styles.homeLink}>
          <div className={styles.homeLinkIcon}>
            <Image
              height={25}
              width={25}
              alt="purarue.xyz sun icon"
              src="https://purarue.xyz/favicon.ico"
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
