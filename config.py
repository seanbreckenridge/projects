# Configuration file for listing projects.

import os
from pathlib import Path

this_dir: Path = Path(os.path.dirname(__file__)).absolute()

github_username = "seanbreckenridge"
ignore_repos = set(
    [
        "st",
        "notes",
        "advent-of-code-2019",
        "rsa",
        "projects",
        "cs-assignments",
        "plus1",
        "commands-discordpy-starter",
        "jikanpy_ext",
        "greasyfork",
        "breach-parse",
        "forever-webui",
        "jikan",
        "jikan-rest",
        "jikanpy",
        "k_grok",
        "lets-get-arrested",
        "rotten_tomatoes_cli",
        "rotten_tomatoes_client",
        "sl",
        "sw",
        "promnesia",
        "seanbreckenridge",
        "HPI-1",
        "youtube_subtitles_downloader",
        "pygithub_requests_error",
        "gnu-rust-utils",
        "jikan-rest-docker",
        "okayweather",
    ]
)
include_forks = True
datafile: Path = this_dir / "data.json"
