import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  rules: {
    'prettier/prettier': ['error'],
    'react/react-in-jsx-scope': 'off', // inutile avec Next.js
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
});

const eslintConfig = [...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier')];

export default eslintConfig;
