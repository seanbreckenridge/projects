import React from "react";
import styles from "../styles/Home.module.css";

import { Repository } from "../lib/parseData";

import { IconBrandGithub } from "@tabler/icons";

import FooterIcon, { Website } from "./icons";
import LazyImage from "./lazy_image";

interface IRepo {
  repo: Repository;
}

const RepoCard = React.memo(({ repo }: IRepo) => {
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
        {repo.full_name === "seanbreckenridge/projects" ? (
          <div className={styles.lazyImageContainer}>
            <iframe src="https://sean.fish/projects" />
          </div>
        ) : (
          <LazyImage
            src={repo.img}
            dimensions={repo.dimensions}
            name={repo.name}
          />
        )}
      </div>
      <hr />
      <div className={styles.cardFooter}>
        <FooterIcon href={remoteURL} linkText="Github">
          <IconBrandGithub />
        </FooterIcon>
        <Website url={repo.url} />
      </div>
    </div>
  );
});

RepoCard.displayName = "Repository Card";

interface IRepoGrid {
  repos: Repository[];
  filterTags: string[];
}

const RepoGrid = ({ repos, filterTags }: IRepoGrid) => {
  const shownRepos = repos.filter((repo: Repository) => {
    if (filterTags.length === 0) return true;
    return repo.tags.some((tag: string) => filterTags.includes(tag));
  });
  return (
    <>
      {shownRepos.map((repo: Repository) => {
        return <RepoCard key={repo.full_name} repo={repo} />;
      })}
    </>
  );
};

RepoGrid.displayName = "Repository Grid";

export default RepoGrid;
