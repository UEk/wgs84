// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import globals from 'globals';

export default tseslint.config(
  // 1. Globala ignoreringar (ersätter din gamla ignores-block)
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'report/**',
      'node_modules/**',
      'doc/**',
      '*.config.*'
    ],
  },

  // 2. Bas-konfiguration (JS & TS Rekommenderat + Sortering)
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  perfectionist.configs['recommended-natural'],

  // 3. Gemensamma inställningar för alla filer
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.vitest, // Lägger till describe, it, expect etc. automatiskt
      },
    },
    rules: {
      // Allmänna regler
      'no-console': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'no-throw-literal': 'error',
      
      // TypeScript-specifika regler (utan typ-check krav)
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as' }],

      // Perfectionist sköter nu all sortering (imports, keys, class members)
      // Du behöver inte längre definiera order[] manuellt om du inte vill ha en special-ordning.
    },
  },

  // 4. Konfiguration för källkod med strikt typ-check
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Här kan du lägga till regler som kräver projekt-context
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
    },
  },

  // 5. Undantag för tester och exempel (tillåt console etc.)
  {
    files: ['test/**/*.ts', 'example/**/*.ts'],
    rules: {
      'no-console': 'off', // Tillåt console i exempel och tester
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
);