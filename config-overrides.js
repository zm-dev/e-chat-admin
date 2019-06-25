const path = require('path');
const { addBabelPlugins, useEslintRc, override, addWebpackAlias } = require('customize-cra');

const addSvgInlineLoader = () => config => {
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;

  loaders.splice(loaders.length - 1, 0, {
    test: /\.svg$/,
    loader: 'svg-inline-loader?removeSVGTagAttrs=false',
  });

  return config;
};

module.exports = override(
  useEslintRc(),
  addWebpackAlias({
    '@': path.join(__dirname, 'src'),
  }),
  ...addBabelPlugins([
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    },
  ]),
  addSvgInlineLoader()
);
