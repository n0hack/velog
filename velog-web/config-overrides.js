/* eslint-disable */
const path = require('path');
const { override, addWebpackAlias, useBabelRc } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    '@pages': path.resolve(__dirname, 'src/pages'),
  }),
);
