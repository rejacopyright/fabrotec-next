import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: [
      // 'plugin:react/recommended',
      'next/core-web-vitals',
      'next/typescript',
      // 'plugin:@next/next/recommended',
      // 'eslint:recommended',
      // 'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    ignorePatterns: ['build/**/*'],
    parser: '@typescript-eslint/parser',
    plugins: [
      // 'react-hooks',
      // '@typescript-eslint',
      'prettier',
      'unused-imports',
      'simple-import-sort',
    ],
    rules: {
      '@next/next/no-img-element': 'off',
      'max-lines': ['error', { max: 500, skipBlankLines: false, skipComments: false }],
      'prefer-arrow-callback': ['warn', { allowNamedFunctions: false }],
      'no-duplicate-imports': 'error',
      'no-console': 'warn',
      'no-empty': 'off',
      'no-debugger': 'warn',
      eqeqeq: 'error',
      'prettier/prettier': 'error',
      'array-callback-return': 'warn',
      'no-unused-vars': 'off',
      'no-empty-function': 'error',
      'no-unsafe-optional-chaining': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'off',
      'react/display-name': 'off',
      'react/no-array-index-key': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unstable-nested-components': [
        'off',
        {
          allowAsProps: false,
        },
      ],
      'react/jsx-key': [
        'warn',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
      'react/jsx-no-useless-fragment': [
        'warn',
        {
          allowExpressions: true,
        },
      ],
    },
  }),
]

export default eslintConfig
