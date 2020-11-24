## projects

[`update`](./update) compares [`data.toml`](./data.toml) against my current repos from a cached Github response. If there are any new projects, prompts me to edit a description in vim as markdown. That markdown is then compiled into HTML when the site is built

The metadata from the github API helps me determine project ordering.

This is built every couple hours in the background, it builds as pushes to the `gh-pages` branch, which is served with [`netlify`](https://www.netlify.com/)
