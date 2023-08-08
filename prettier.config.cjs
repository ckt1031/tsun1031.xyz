const prettierConfig = require('@ckt1031/prettier-config/index.json');

const config = {
  ...prettierConfig,
  plugins: [...prettierConfig.plugins, 'prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};

module.exports = config;
