import typescriptEslint from "typescript-eslint";
import tsdoc from "eslint-plugin-tsdoc";
import jest from "eslint-plugin-jest";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  ...typescriptEslint.configs.recommended,
  {
    ignores: ["**/*.d.ts", "**/*.config.js", "docs", "coverage", "dist"],
  },
  {
    plugins: {
      "@typescript-eslint": typescriptEslint.plugin,
      tsdoc,
    },

    languageOptions: {
      parser: typescriptEslint.parser,
      sourceType: "script",

      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.jest.json"],
      },
    },

    rules: {
      "tsdoc/syntax": "warn",
    },
  },
  {
    ...typescriptEslint.configs.disableTypeChecked,
    files: ["scripts/**/*.js"],
  },
  {
    ...jest.configs["flat/recommended"],
    files: ["**/*.spec.ts", "**/*.test.ts"],

    plugins: {
      jest,
    },

    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },
  },
];
