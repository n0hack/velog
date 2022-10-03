/* eslint-disable */
const path = require('path');
const { override, addWebpackAlias, useBabelRc } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@lib': path.resolve(__dirname, 'src/lib'),
    '@pages': path.resolve(__dirname, 'src/pages'),
  }),
);
