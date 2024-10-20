/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 在ESLint配置文件中添加Node.js环境支持。
  // 这样ESLint会识别Node.js的全局变量, e.g. process
  "env": {
    "node": true
  }
}
