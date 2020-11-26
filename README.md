## projects

[projects.sean.fish](https://projects.sean.fish/)

[`update`](./update) compares [`data.toml`](./data.toml) against my current repos from a cached Github response. If there are any new projects, prompts me to edit a description in vim as markdown. That markdown is then compiled into HTML when the site is built

The metadata from the github API helps me determine project ordering.

This is served on a different base path (`/projects`) in production. Seems that `next.js` still doesn't have the config option in `next.config.js` perfect, so it requires some rerouting on the nginx side:

```nginx
location /projects/ {
  proxy_pass http://127.0.0.1:3000/projects;
}

location /projects/_next/ {
  # required since the above doesnt end with '/'
  proxy_pass http://127.0.0.1:3000/projects/_next/;
}

# for some reason image optimization requests still use base path of the webserver
location /_next/ {
  proxy_pass http://127.0.0.1:3000/projects/_next/;
}
```
