/* eslint-disable */
const {
  useBabelRc,
  removeModuleScopePlugin,
  override,
  addWebpackAlias,
} = require('customize-cra');
const path = require('path');

module.exports = override(
  useBabelRc(),
  removeModuleScopePlugin(),
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@lib': path.resolve(__dirname, 'src/lib'),
    '@api': path.resolve(__dirname, 'src/lib/api'),
    '@hooks': path.resolve(__dirname, 'src/lib/hooks'),
    '@styles': path.resolve(__dirname, 'src/lib/styles'),
    '@modules': path.resolve(__dirname, 'src/modules'),
    '@pages': path.resolve(__dirname, 'src/pages'),
  }),
);
