## projects

Live at [sean.fish/projects](https://sean.fish/projects)

[`update`](./update) compares [`data.toml`](./data.toml) against my current repos from a cached Github response. If there are any new projects, prompts me to edit a description in vim as markdown. That markdown is then compiled into HTML when the site is built

The metadata from the github API helps me determine project ordering.

This is served on a different base path (`/projects`) in production, with `yarn prod-build && yarn prod-server`, with `nginx` like:

```nginx
location /projects/ {
  proxy_pass http://127.0.0.1:3000/projects;
}
location /projects/_next/ {
  # required since the above proxy pass doesnt end with '/'
  proxy_pass http://127.0.0.1:3000/projects/_next/;
}
```
