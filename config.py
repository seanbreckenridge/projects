# Configuration file for listing projects.

import os

this_dir = os.path.abspath(os.path.dirname(__file__))

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
    ]
)
include_forks = True
data_dir = os.path.join(this_dir, "data")
