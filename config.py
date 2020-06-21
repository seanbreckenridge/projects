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
    ]
)
include_forks = False
data_dir = os.path.join(this_dir, "data")
