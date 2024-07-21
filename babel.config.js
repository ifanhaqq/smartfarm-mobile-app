module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            crypto: "react-native-crypto",
            stream: "stream-browserify",
            buffer: "buffer",
            assert: "assert",
            http: "stream-http",
            https: "https-browserify",
            os: "react-native-os",
            url: "url",
          },
        },
      ],
    ],
  };
};
