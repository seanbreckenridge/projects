import Head from "next/head";
import Script from "next/script";

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
        <meta property="ba:title" content="back home" />
        <meta property="ba:url" content="https://sean.fish" />
        <meta property="ba:color" content="rgb(156, 181, 180)" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          <RepoGrid repos={repos} />
        </div>
        <Script src="https://sean.fish/p/back-arrow-bundle.js" strategy="beforeInteractive"></Script>
      </main>
    </div>
  );
}
