import Head from "next/head";

import styles from "../styles/Home.module.css";

import { Repository, loadRepos } from "../lib/parseData";

interface IndexProps {
  repos: Repository[];
}

export default function Home({ repos }: IndexProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>sean | Programming Projects</title>
        <link rel="icon" href="https://sean.fish/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          {repos.map((repo: Repository) => {
            const remoteURL = "https://github.com/" + repo.full_name;
            return (
              <div key={remoteURL} className={styles.card}>
                <div className={styles.cardTitle}>
                  <a href={remoteURL}>
                    <h3>{repo.name}</h3>
                  </a>
                  <span>{repo.language}</span>
                </div>
                <div
                  className={styles.cardDescription}
                  dangerouslySetInnerHTML={{ __html: repo.description }}
                ></div>
                <hr />
                <div className={styles.cardFooter}>
                  <a href={remoteURL}>GitHub</a>
                  {repo.has_gitlab ? (
                    <a href={remoteURL.replace("github", "gitlab")}>GitLab</a>
                  ) : (
                    <></>
                  )}
                  {repo.url != null ? <a href={repo.url}>Website</a> : <></>}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      repos: await loadRepos(),
    },
  };
}
