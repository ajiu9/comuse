import ajiu9 from '@ajiu9/eslint-config'

export default ajiu9({
  formatters: true,
  ignores: [
    '**/cache',
    '**/dist',
  ],
},
{
  files: [
    '**/*.md',
    '**/*.md/*.[jt]s',
    '**/*.md/*.vue',
    '**/demo.vue',
    '**/demo.client.vue',
    '**/*.test.ts',
    'scripts/*.ts',
  ],
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    'no-proto': 'off',
    'no-restricted-properties': 'off',
  },
})
