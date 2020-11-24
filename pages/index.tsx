import Head from "next/head";

import styles from "../styles/Home.module.css";

import { memo } from "react";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons";
import { Repository, loadRepos } from "../lib/parseData";

interface IndexProps {
  repos: Repository[];
}

const taIconSize = 29;

export default function Home({ repos }: IndexProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sean Breckenridge | Projects</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Projects</h1>
          <h3>Sean Breckenridge</h3>
          <div className={styles.icons}>
            <a href="https://www.linkedin.com/in/sean-breckenridge/">
              <IconBrandLinkedin
                className={styles.darkenIcon}
                height={taIconSize}
                width={taIconSize}
              />
            </a>
            <a href="https://sean.fish" className={styles.homeLink}>
              <img src="/favicon.ico" />
              <span>WEBSITE</span>
            </a>
            <a href="https://github.com/seanbreckenridge/">
              <IconBrandGithub
                className={styles.darkenIcon}
                height={taIconSize}
                width={taIconSize}
              />
            </a>
          </div>
        </div>
        <div className={styles.grid}>
          {repos.map((repo: Repository) => {
            return <RepoCard key={repo.full_name} repo={repo} />;
          })}
        </div>
      </main>
    </div>
  );
}

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
        {repo.img != null ? <img src={repo.img!} /> : <></>}
      </div>
      <hr />
      <div className={styles.cardFooter}>
        <a href={remoteURL}>GitHub</a>
        {repo.has_gitlab ? (
          <a href={remoteURL.replace("github", "gitlab")}>GitLab</a>
        ) : (
          <></>
        )}
        <Website url={repo.url} />
      </div>
    </div>
  );
});

interface IWebsite {
  url: string;
}

const Website = memo(({ url }: IWebsite) => {
  if (url != null) {
    let linkText: string = "Website";
    if (url.indexOf("pypi.org") !== -1) {
      linkText = "PyPi";
    } else if (url.indexOf("crates.io") !== -1) {
      linkText = "Crates.io";
    } else if (url.indexOf("hex.pm") !== -1) {
      linkText = "Hex";
    }
    return <a href={url}>{linkText}</a>;
  } else {
    return <></>;
  }
});

export async function getStaticProps() {
  return {
    props: {
      repos: await loadRepos(),
    },
  };
}
