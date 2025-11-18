// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import sortClassMembers from 'eslint-plugin-sort-class-members';

export default tseslint.config(
  // Base recommended configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Global configuration for TypeScript files with type checking
  {
    files: ['src/**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'jest': jestPlugin,
      'import': importPlugin,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      'sort-class-members': sortClassMembers,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'writable',
        Buffer: 'readonly',
        console: 'readonly',
        // Jest globals
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        node: {
          extensions: ['.ts'],
        },
      },
    },

    rules: {
      // Jest recommended rules
      ...jestPlugin.configs.recommended.rules,
      
      // Import plugin rules
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-default-export': 'error',
      
      // Simple import sort
      'sort-imports': 'off',
      'import/order': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      
      // Sort class members
      'sort-class-members/sort-class-members': ['error', {
        order: [
          '[static-properties]',
          '[properties]',
          '[conventional-private-properties]',
          'constructor',
          '[static-methods]',
          '[methods]',
          '[conventional-private-methods]',
        ],
        accessorPairPositioning: 'getThenSet',
      }],
      
      // Sort keys
      'sort-keys-fix/sort-keys-fix': 'warn',
      
      // Error prevention
      'no-async-promise-executor': 'off',
      'no-return-assign': 'error',
      'curly': 'error',
      'no-throw-literal': 'error',
      'eqeqeq': ['error', 'always'],
      
      // Function rules
      'func-names': ['error', 'always'],
      'func-name-matching': ['error', { considerPropertyDescriptor: true }],
      
      // Code consistency
      'no-confusing-arrow': 'error',
      'no-useless-computed-key': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-spread': 'error',
      'no-console': 'error',
      'no-void': 'error',
      
      // Padding/spacing
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: '*', next: 'export' },
      ],
      
      // TypeScript-specific rules
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-namespace': ['error', {
        allowDeclarations: false,
        allowDefinitionFiles: false,
      }],
      '@typescript-eslint/explicit-member-accessibility': ['error', {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
          properties: 'no-public',
        },
      }],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'as',
      }],
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-includes': 'error',
    },
  },

  // Configuration for test and example files (without type checking)
  {
    files: ['test/**/*.ts', 'example/**/*.ts', 'scripts/**/*.ts'],
    
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'jest': jestPlugin,
      'import': importPlugin,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      'sort-class-members': sortClassMembers,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        // No project option - skip type checking for these files
      },
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'writable',
        Buffer: 'readonly',
        console: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        node: {
          extensions: ['.ts'],
        },
      },
    },

    rules: {
      // Jest recommended rules
      ...jestPlugin.configs.recommended.rules,
      
      // Import plugin rules
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-default-export': 'error',
      
      // Simple import sort
      'sort-imports': 'off',
      'import/order': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      
      // Sort class members
      'sort-class-members/sort-class-members': ['error', {
        order: [
          '[static-properties]',
          '[properties]',
          '[conventional-private-properties]',
          'constructor',
          '[static-methods]',
          '[methods]',
          '[conventional-private-methods]',
        ],
        accessorPairPositioning: 'getThenSet',
      }],
      
      // Sort keys
      'sort-keys-fix/sort-keys-fix': 'warn',
      
      // Error prevention
      'no-async-promise-executor': 'off',
      'no-return-assign': 'error',
      'curly': 'error',
      'no-throw-literal': 'error',
      'eqeqeq': ['error', 'always'],
      
      // Function rules
      'func-names': ['error', 'always'],
      'func-name-matching': ['error', { considerPropertyDescriptor: true }],
      
      // Code consistency
      'no-confusing-arrow': 'error',
      'no-useless-computed-key': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-spread': 'error',
      'no-console': 'off', // Allow console in tests/examples
      'no-void': 'error',
      
      // Padding/spacing
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: '*', next: 'export' },
      ],
      
      // TypeScript-specific rules (non-type-checked versions)
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-namespace': ['error', {
        allowDeclarations: false,
        allowDefinitionFiles: false,
      }],
      '@typescript-eslint/explicit-member-accessibility': ['error', {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
          properties: 'no-public',
        },
      }],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'as',
      }],
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      
      // Relaxed rules for test/example files
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      'jest/no-disabled-tests': 'off',
    },
  },

  // Override rules for server files
  {
    files: ['**/server/*.ts'],
    rules: {
      'no-inner-declarations': 'off',
    },
  },



  // Ignore patterns (including config files)
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'report/**',
      'node_modules/**',
      '*.config.*',
      'eslint.config.mjs'
    ],
  }
);