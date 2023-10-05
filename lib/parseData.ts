import fs from "fs";
import path from "path";
import toml from "toml";
import { remark } from "remark";
import html from "remark-html";
import { promisify } from "util";

const cacheFile = path.join(process.cwd(), "cache.json");
const dataFile = path.join(process.cwd(), "data.toml");
const publicDir = path.join(process.cwd(), "public");

export interface Dimensions {
  width: number;
  height: number;
  type: string;
}

export interface Repository {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  language: string;
  url?: string;
  img?: string;
  dimensions?: Dimensions;
  score: number;
  priority: number;
  tags: string[];
  cache_data: {
    stars: number;
    updated_at: string;
  };
}

const PRIO_MULTIPLIER = 1000000000;
const STAR_MULTIPLIER = 100;
const DAYS_MULTIPLIER = 0.001;

// Computes a numerical score for this repo, to be scored by
// Order based on:
//  Priority
//  Star + Score (manual star offset)
//  Days since this was edited
function calculateScore(repo: Repository): number {
  if (repo.priority === undefined || repo.priority <= 0 || repo.priority > 3) {
    throw `Unexpected priority for ${repo.name}`;
  }
  const updated_seconds_ago =
    (Date.now() - Date.parse(repo.cache_data.updated_at)) / 1000;
  const updated_days_ago = updated_seconds_ago / 86400;
  return (
    PRIO_MULTIPLIER * repo.priority +
    STAR_MULTIPLIER * (repo.cache_data.stars + repo.score) -
    DAYS_MULTIPLIER * updated_days_ago
  );
}

function sortRepos(unsorted: Repository[]): Repository[] {
  return unsorted.sort((a: Repository, b: Repository) => {
    return calculateScore(a) - calculateScore(b);
  });
}

function removeTrailing(str: string, char: string): string {
  while (str.endsWith(char)) {
    str = str.substring(0, str.length - 1);
  }
  return str;
}

const imgPrefix = process.env.IMG_PREFIX ?? "";

// renders the markdown description to HTML
// remove any trailing
async function renderRepo(repo: Repository): Promise<Repository> {
  const processedDesc = await remark()
    .use(html)
    .process(removeTrailing(repo.description, "."));
  repo.description = processedDesc.toString();
  if (repo.img != null) {
    if (imgPrefix) {
      const withSlash = repo.img.startsWith("/") ? repo.img : `/${repo.img}`;
      repo.img = `${imgPrefix}${withSlash}`;
    }
  }
  return repo;
}

export async function loadRepos(): Promise<Repository[]> {
  let repos: Repository[] = [];

  if (!fs.existsSync(dataFile)) {
    throw `Could not find data file ${dataFile}`;
  }

  if (!fs.existsSync(cacheFile)) {
    throw `Could not find cache file ${cacheFile}`;
  }

  // parse TOML
  const repoData = toml.parse(fs.readFileSync(dataFile).toString());

  // load cache
  const cache = JSON.parse(fs.readFileSync(cacheFile).toString());

  const cacheFullNameMap: { [key: string]: any } = {};
  cache.forEach((repo: any) => {
    cacheFullNameMap[repo.full_name] = {
      stars: repo.stargazers_count,
      updated_at: repo.updated_at,
    };
  });

  // ignore the 'ignored' key
  Object.keys(repoData).forEach((repoName) => {
    if (repoName !== "ignored") {
      const data = repoData[repoName];
      if (cacheFullNameMap[data.full_name]) {
        data.cache_data = cacheFullNameMap[data.full_name];
      } else {
        console.log(`Could not find cache data for ${data.full_name}`);
      }
      repos.push(data);
    }
  });

  // sort repos and render markdown to HTML
  // map(renderRepo) returns a list of promises, use Promise.all
  return Promise.all(sortRepos(repos).reverse().map(renderRepo));
}
