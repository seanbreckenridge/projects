## projects

[projects.sean.fish](https://projects.sean.fish/)

[`update`](./update) compares [`data.toml`](./data.toml) against my current repos from a cached Github response. If there are any new projects, prompts me to edit a description in vim as markdown. That markdown is then compiled into HTML when the site is built

The metadata from the github API helps me determine project ordering.

Deployed with `Vercel`. Is mostly a static site, but deploying it as a server to take advantage of the next.js client-side image compression/optimization, since there are so many images on this page.
