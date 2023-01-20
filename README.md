## projects

Live at [sean.fish/projects](https://sean.fish/projects/)

[`update`](./update) compares [`data.toml`](./data.toml) against my current repos from a cached Github response. If there are any new projects, prompts me to edit a description in vim as markdown. That markdown is then compiled into HTML when the site is built

The metadata from the github API helps me determine project ordering.
