module.exports = {
  extends: ['prettier', 'prettier/react', 'plugin:prettier/recommended'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  globals: {
    vize: true,
  },
  rules: {},
};
