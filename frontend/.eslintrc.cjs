module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['vite.config.js'/* other files to ginore */],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    indent: 'off',
    'no-underscore-dangle': 'off',
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
  },
};
