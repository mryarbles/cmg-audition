const path = require('path');
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['jest'],
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:jest/recommended'
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  // https://eslint.org/docs/rules/
  // https://github.com/yannickcr/eslint-plugin-react#configuration
  rules: {
    indent: 'off',
    'linebreak-style': 'off',
    quotes: 'off',
    semi: 'off',
    'no-debugger': process.env.NODE_ENV !== 'production' ? 'warn' : 'error',
    'no-console': process.env.NODE_ENV !== 'production' ? 'warn' : 'error',
    'max-len': [
      'warn',
      {
        code: 160,
        ignoreTrailingComments: true,
        comments: 160,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'comma-dangle': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off', // disable warning for missing public, protected, private
    '@typescript-eslint/no-parameter-properties': 'off',      // warn for use of parameter properties.  Leaving warning because I don't really like that pattern.
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'jest/valid-describe': 'off'
  },
  overrides: [
    {
      files: ['*.test.{ts,tsx,js,jsx}'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ],
  env: {
    browser: false,
    node: true,
    es6: true,
    commonjs: true,
    worker: true,
    'jest/globals': true
  }
};
