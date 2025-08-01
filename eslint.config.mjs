/*import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";*/

// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
export default tseslint.config(eslint.configs.recommended, tseslint.configs.strict, tseslint.configs.stylistic);

// {
//   files: ["**/*.{js,mjs,cjs,jsx, ts, tsx}"],
//  plugins: { js, "react-hooks": reactHooks },
//  extends: ["js/recommended", pluginReact.configs.flat.recommended],
// },
// {
//  files: ["**/*.{js,mjs,cjs,jsx, ts, tsx}"],
// languageOptions: { globals: globals.browser },
// rules: {
//   "react/prop-types": "off",
//   "react/react-in-jsx-scope": "off",
//   "react-hooks/exhaustive-deps": "warn",
//  },
// },
// {
// settings: {
//    react: {
//      version: "detect",
//    },
//  },
// },
