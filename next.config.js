const imgConf = {
  domains: [
    "sean.fish",
    "localhost",
    "sean-fish-imageproxy.s3.us-west-1.amazonaws.com",
  ],
  loader: "custom",
  unoptimized: true,
};

module.exports = {
  images: imgConf,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
