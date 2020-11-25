import fs from "fs";
import path from "path";
import toml from "toml";
import remark from "remark";
import html from "remark-html";
var { promisify } = require("util");
var sizeOf = promisify(require("image-size"));

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
  updated_at: string;
  language: string;
  has_gitlab: boolean;
  url?: string;
  img?: string;
  dimensions?: Dimensions;
  stars: number;
  score: number;
  priority: number;
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
  const updated_seconds_ago = (Date.now() - Date.parse(repo.updated_at)) / 1000;
  const updated_days_ago = updated_seconds_ago / 86400;
  return (
    PRIO_MULTIPLIER * repo.priority +
    STAR_MULTIPLIER * (repo.stars + repo.score) -
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

// renders the markdown description to HTML
// remove any trailing
async function renderRepo(repo: Repository): Promise<Repository> {
  const processedDesc = await remark()
    .use(html)
    .process(removeTrailing(repo.description, "."));
  repo.description = processedDesc.toString();
  repo.name = repo.name.replace(/_/g, "-");
  if (repo.img != null) {
    repo.dimensions = await sizeOf(path.join(publicDir, repo.img!));
  }
  return repo;
}

export async function loadRepos(): Promise<Repository[]> {
  let repos: Repository[] = [];
  // parse TOML
  const repoData = toml.parse(fs.readFileSync(dataFile).toString());

  // ignore the 'ignored' key
  Object.keys(repoData).forEach((repoName) => {
    if (repoName !== "ignored") {
      repos.push(repoData[repoName]);
    }
  });
  // sort repos and render markdown to HTML
  // map(renderRepo) returns a list of promises, use Promise.all
  return Promise.all(sortRepos(repos).reverse().map(renderRepo));
}
