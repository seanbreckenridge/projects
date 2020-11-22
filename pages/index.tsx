import Head from 'next/head';
import styles from '../styles/Home.module.css';

import {Repository, readData} from "../lib/parseData";

interface IndexProps {
  repos: Repository[];
}

export default function Home({repos}: IndexProps) {
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
              <a key={remoteURL} href={remoteURL} className={styles.card}>
                {repo.name}
              </a>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      repos: readData(),
    }
  }
}
