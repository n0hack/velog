/* eslint-disable */
const path = require('path');
const { override, addWebpackAlias, useBabelRc } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@containers': path.resolve(__dirname, 'src/containers'),
    '@lib': path.resolve(__dirname, 'src/lib'),
    '@modules': path.resolve(__dirname, 'src/modules'),
    '@pages': path.resolve(__dirname, 'src/pages'),
  }),
);
