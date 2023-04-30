/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    extraNodeModules: {
      ...defaultConfig.resolver.extraNodeModules,
      src: path.resolve(__dirname, "src"),
    },
  },
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve(
      "metro-react-native-babel-transformer"
    ),
  },
};
