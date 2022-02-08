// deploy under /projects in production

const basePath = process.env.ENV === "production" ? "/projects" : undefined;

let imgConf = {
  domains: ["sean.fish", "localhost"],
};

if (basePath) {
  imgConf.path = `${basePath}/_next/image`;
}

module.exports = {
  basePath: basePath,
  images: imgConf,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
