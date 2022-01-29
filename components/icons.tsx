import React, {useState} from "react";
import styles from "../styles/Home.module.css";

import Image from "next/image";
import {
  IconBrandPython,
  IconTable,
  IconBrowser,
  IconShip,
  IconHexagon,
} from "@tabler/icons";

interface IFooterIcon {
  children?: any;
  href: string;
  linkText: string;
  enable?: Function;
  disable?: Function;
}

const FooterIcon = React.memo(
  ({children, href, linkText, enable, disable}: IFooterIcon) => {
    const noOp = () => {};
    const enableAnim = enable ?? noOp;
    const disaleAnim = disable ?? noOp;
    return (
      <a
        href={href}
        onMouseEnter={(_e) => enableAnim()}
        onMouseLeave={(_e) => disaleAnim()}
        onTouchStart={(_e) => enableAnim()}
        onTouchEnd={(_e) => disaleAnim()}
        aria-label={linkText}
      >
        <div className={styles.darkenIcon}>
          {children}
          <span
            style={{
              position: "relative",
              top: -4,
              paddingLeft: 4,
            }}
          >
            {linkText!}
          </span>
        </div>
      </a>
    );
  }
);

FooterIcon.displayName = "Footer Icon"

interface IWebsite {
  url?: string;
}

export const Website = React.memo(({url}: IWebsite) => {
  if (url != null) {
    if (url.indexOf("sean.fish") !== -1) {
      return <MonoFavicon url={url!} />;
    } else if (url.indexOf("pypi.org") !== -1) {
      return (
        <FooterIcon href={url!} linkText="PyPi">
          <IconBrandPython />
        </FooterIcon>
      );
    } else if (url.indexOf("docs.google.com") !== -1) {
      return (
        <FooterIcon href={url!} linkText="Spreadsheet">
          <IconTable />
        </FooterIcon>
      );
    } else if (url.indexOf("crates.io") !== -1) {
      return (
        <FooterIcon href={url!} linkText="Crates.io">
          <IconShip />
        </FooterIcon>
      );
    } else if (url.indexOf("hex.pm") !== -1) {
      return (
        <FooterIcon href={url!} linkText="Hex">
          <IconHexagon />
        </FooterIcon>
      );
    } else {
      return (
        <FooterIcon href={url!} linkText="Site">
          <IconBrowser />
        </FooterIcon>
      );
    }
  } else {
    return <></>;
  }
});

Website.displayName = "Website"

interface IMonoFavicon {
  url: string;
}

// keep track of onHover events so that the favicon can be
// colored/uncolored
const MonoFavicon = React.memo(({url}: IMonoFavicon) => {
  const [monochrome, setMonochrome] = useState<boolean>(true);
  const size = 20;

  return (
    <FooterIcon
      href={url}
      linkText="Site"
      enable={() => setMonochrome(false)}
      disable={() => setMonochrome(true)}
    >
      <span>
        <Image
          className={
            monochrome
              ? styles.monochromeIconActive
              : styles.monochromeIconInActive
          }
          src="https://sean.fish/favicon.ico"
          alt=""
          height={size}
          width={size}
        />
      </span>
    </FooterIcon>
  );
});

MonoFavicon.displayName = "Monochrome Favicon";

export default FooterIcon;
