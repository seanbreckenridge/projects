import Head from "next/head";
import Script from "next/script";
import React from "react";

import styles from "../styles/Home.module.css";

import { Repository, loadRepos } from "../lib/parseData";

import Header from "../components/header";
import RepoGrid from "../components/card";
import FilterSelect, { Tag } from "../components/filter";

export async function getStaticProps() {
  const repos = await loadRepos();
  const tagCount = {};
  repos.forEach((repo: Repository) => {
    repo.tags.forEach((tag: string) => {
      tagCount[tag] = tagCount[tag] ? tagCount[tag] + 1 : 1;
    });
  });
  const tags = Object.keys(tagCount)
    .map((key: string) => {
      return { name: key, count: tagCount[key] };
    })
    .sort((a, b) => {
      return b.count - a.count;
    });
  return {
    props: {
      repos,
      tags,
    },
  };
}

interface IHome {
  repos: Repository[];
  tags: Tag[];
}

export default function Home({ repos, tags }: IHome) {
  const [filters, setFilters] = React.useState<string[]>([]);
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
      <FilterSelect tags={tags} filters={filters} setFilters={setFilters} />
      <main className={styles.main}>
        <div className={styles.grid}>
          <RepoGrid repos={repos} filterTags={filters} />
        </div>
        <Script
          src="https://sean.fish/p/back-arrow-bundle.js"
          strategy="beforeInteractive"
        ></Script>
      </main>
    </div>
  );
}
