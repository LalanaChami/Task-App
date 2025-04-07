module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@config": "./src/config",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
