# Configuration file for listing projects.

import os

this_dir = os.path.abspath(os.path.dirname(__file__))

github_username = "seanbreckenridge"
ignore_repos = set(["st" "notes"])
include_forks = False
data_dir = os.path.join(this_dir, "data")
