import Head from "next/head";

import styles from "../styles/Home.module.css";

import { memo, useState } from "react";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandPython,
  IconTable,
  IconBrowser,
  IconShip,
  IconHexagon,
} from "@tabler/icons";
import { Repository, loadRepos } from "../lib/parseData";

interface IndexProps {
  repos: Repository[];
}

export async function getStaticProps() {
  return {
    props: {
      repos: await loadRepos(),
    },
  };
}

export default function Home({ repos }: IndexProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sean Breckenridge | Projects</title>
        <meta
          name="description"
          content="A list of Sean Breckenridge's Projects"
        />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          {repos.map((repo: Repository) => {
            return <RepoCard key={repo.full_name} repo={repo} />;
          })}
        </div>
      </main>
    </div>
  );
}

const Header = memo(() => {
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

interface IRepo {
  repo: Repository;
}

const RepoCard = memo(({ repo }: IRepo) => {
  const remoteURL = "https://github.com/" + repo.full_name;
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <a href={remoteURL}>
          <h3>{repo.name}</h3>
        </a>
        <span>{repo.language}</span>
      </div>
      <div className={styles.cardDescription}>
        <div dangerouslySetInnerHTML={{ __html: repo.description }}></div>
        {repo.img != null ? (
          <a href={repo.img!} target="_blank">
            <img src={repo.img!} alt={`${repo.name}`} />
          </a>
        ) : (
          <></>
        )}
      </div>
      <hr />
      <div className={styles.cardFooter}>
        <DarkIconFooter href={remoteURL} linkText="Github">
          <IconBrandGithub />
        </DarkIconFooter>
        {repo.has_gitlab ? (
          <DarkIconFooter
            href={remoteURL.replace("github", "gitlab")}
            linkText="Gitlab"
          >
            <IconBrandGitlab />
          </DarkIconFooter>
        ) : (
          <></>
        )}
        <Website url={repo.url} />
      </div>
    </div>
  );
});

interface IDarkIconFooter {
  children?: any;
  href: string;
  linkText: string;
  enable?: Function;
  disable?: Function;
}

const noOp = () => {};

const DarkIconFooter = memo(
  ({ children, href, linkText, enable, disable }: IDarkIconFooter) => {
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

interface IWebsite {
  url?: string;
}

const Website = ({ url }: IWebsite) => {
  if (url != null) {
    if (url.indexOf("sean.fish") !== -1) {
      return <MonoFavicon url={url!} />;
    } else if (url.indexOf("pypi.org") !== -1) {
      return (
        <DarkIconFooter href={url!} linkText="PyPi">
          <IconBrandPython />
        </DarkIconFooter>
      );
    } else if (url.indexOf("docs.google.com") !== -1) {
      return (
        <DarkIconFooter href={url!} linkText="Spreadsheet">
          <IconTable />
        </DarkIconFooter>
      );
    } else if (url.indexOf("crates.io") !== -1) {
      return (
        <DarkIconFooter href={url!} linkText="Crates.io">
          <IconShip />
        </DarkIconFooter>
      );
    } else if (url.indexOf("hex.pm") !== -1) {
      return (
        <DarkIconFooter href={url!} linkText="Hex">
          <IconHexagon />
        </DarkIconFooter>
      );
    } else {
      return (
        <DarkIconFooter href={url!} linkText="Site">
          <IconBrowser />
        </DarkIconFooter>
      );
    }
  } else {
    return <></>;
  }
};

interface IMonoFavicon {
  size?: number;
  url: string;
}

// keep track of onHover events so that the favicon can be
// colored/uncolored
const MonoFavicon = ({ size, url }: IMonoFavicon) => {
  const mSize = size ?? 20;
  const [monochrome, setMonochrome] = useState<boolean>(true);

  return (
    <DarkIconFooter
      href={url}
      linkText="Site"
      enable={() => setMonochrome(false)}
      disable={() => setMonochrome(true)}
    >
      <span>
        <img
          className={
            monochrome
              ? styles.monochromeIconActive
              : styles.monochromeIconInActive
          }
          src="/favicon.ico"
          alt=""
          height={mSize}
          width={mSize}
        />
      </span>
    </DarkIconFooter>
  );
};
