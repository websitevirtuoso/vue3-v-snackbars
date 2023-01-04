module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', '@vue/typescript/recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    quotes: [2, 'single', 'avoid-escape'],
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': ['off'],
  },
  plugins: ['prettier'],
}
