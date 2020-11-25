import Head from "next/head";

import styles from "../styles/Home.module.css";

import { Repository, loadRepos } from "../lib/parseData";

import Header from "../components/header";
import RepoGrid from "../components/card";

export async function getStaticProps() {
  return {
    props: {
      repos: await loadRepos(),
    },
  };
}

interface IHome {
  repos: Repository[];
}

export default function Home({ repos }: IHome) {
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
          <RepoGrid repos={repos} />
        </div>
      </main>
    </div>
  );
}
