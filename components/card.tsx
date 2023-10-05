import React, { useMemo } from "react";
import styles from "../styles/Card.module.css";

import { Repository } from "../lib/parseData";

import { IconBrandGithub } from "@tabler/icons";

import FooterIcon, { Website } from "./icons";
import LazyImage from "./lazy_image";

interface IRepo {
  repo: Repository;
}

const Tags = React.memo(({ tags }: { tags: string[] }) => {
  const desc = tags.join(", ");
  return <div className={styles.cardTags}>{desc}</div>;
});

Tags.displayName = "Tags";

const ToggleableRecursiveIFrame = () => {
  const [show, setShow] = React.useState(false);

  return (
    <div className={styles.lazyImageContainer}>
      {show ? (
        <iframe src="https://sean.fish/projects/" />
      ) : (
        <div className={styles.recurseButtonContainer}>
          <button
            className={styles.recurseButton}
            onClick={() => setShow(true)}
          >
            Recurse?
          </button>
        </div>
      )}
    </div>
  );
};

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
          <ToggleableRecursiveIFrame />
        ) : (
          <LazyImage
            src={repo.img}
            dimensions={repo.dimensions}
            name={repo.name}
          />
        )}
      </div>
      <Tags tags={repo.tags} />
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

function matchesAllFilters(repo: Repository, filterTags: string[]) {
  for (const tag of filterTags) {
    if (!repo.tags.includes(tag)) return false;
  }
  return true;
}

const RepoGrid = ({ repos, filterTags }: IRepoGrid) => {
  const shownRepos = useMemo(() => {
    return repos.filter((repo: Repository) =>
      matchesAllFilters(repo, filterTags)
    );
  }, [repos, filterTags]);
  if (shownRepos.length === 0) {
    return (
      <div>
        No repositories match all the selected filters. Try removing some.
      </div>
    );
  }
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
