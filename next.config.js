// deploy under /projects in production
module.exports = {
  basePath: (process.env.ENV === 'production') ? '/projects': undefined
}
