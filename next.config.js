const basePath = process.env.PREFIX ?? undefined;

const imgConf = {
  domains: [
    "purarue.xyz",
    "localhost",
    "sean-fish-imageproxy.s3.us-west-1.amazonaws.com",
  ],
  loader: "custom",
  unoptimized: true,
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
