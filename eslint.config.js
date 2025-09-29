import ajiu9 from '@ajiu9/eslint-config'

export default ajiu9({
  formatters: true,
  ignores: [
    '**/cache',
    '**/dist',
    'playgrounds',
    '**/*.d.mts',
    '**/*.mjs',
    '**/*.min.js',
    '**/*.life.min.js',
    '**/*.life.js',
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
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-restricted-imports': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-unused-refs': 'off',
    'vue/require-v-for-key': 'off',
    'ts/no-unused-vars': 'off',
    'ts/no-redeclare': 'off',
    'unused-imports/no-unused-vars': 'off',
    'no-proto': 'off',
  },
})
