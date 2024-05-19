const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const dynamicBlocks = [
  "paginated-posts",
  "documents",
];

module.exports = {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry(),

    ...dynamicBlocks.reduce((acc, block) => {
      acc[`${block}/frontend`] = `./assets/src/js/Components/${block}/frontend.js`;
      return acc;
    }, {}),

  },
};
