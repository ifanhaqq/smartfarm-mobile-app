const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
  crypto: require.resolve("react-native-crypto"),
  stream: require.resolve("stream-browserify"),
  buffer: require.resolve("buffer"),
  assert: require.resolve("assert"),
  http: require.resolve("stream-http"),
  https: require.resolve("https-browserify"),
  os: require.resolve("react-native-device-info"),
  url: require.resolve("url"),
};

module.exports = defaultConfig;
