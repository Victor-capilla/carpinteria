import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  {
    // Esta configuración se aplicará a todos los archivos JS/TS
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "unused-imports":unusedImports,
      js,
    },
    extends: [
      "js/recommended",
      tseslint.configs.recommended,
    ],
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // Para archivos JS tradicionales
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
    },
  },
  tseslint.configs.recommended,
]);