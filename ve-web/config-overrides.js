const path = require('path');
const { override, addLessLoader, addWebpackPlugin } = require('customize-cra');
const { alias, configPaths } = require('react-app-rewire-alias');
const WebpackBar = require('webpackbar');

const overrideProcessEnv = value => config => {
  config.resolve.modules = [path.join(__dirname, 'src')].concat(
    config.resolve.modules
  );
  alias({
    ...configPaths('tsconfig.paths.json'),
  })(config);

  return config;
};

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
  }),
  addWebpackPlugin(new WebpackBar({ profile: true })),
  overrideProcessEnv({
    VERSION: JSON.stringify(require('./package.json').version),
  })
);
