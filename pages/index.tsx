import Head from "next/head";
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
        <title>purarue | Projects</title>
        <meta
          name="description"
          content="A list of purarue's Projects"
        />
      </Head>
      <Header />
      <FilterSelect tags={tags} filters={filters} setFilters={setFilters} />
      <main className={styles.main}>
        <div className={styles.grid}>
          <RepoGrid repos={repos} filterTags={filters} />
        </div>
      </main>
    </div>
  );
}
