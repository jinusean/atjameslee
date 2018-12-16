module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    'vue',
    'prettier',
    // 'jinusean'
  ],
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    // 'plugin:jinusean/recommended'
  ],
  // required to lint *.vue files
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
  }
}
