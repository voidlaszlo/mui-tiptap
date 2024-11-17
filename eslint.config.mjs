import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tssUnusedClasses from "eslint-plugin-tss-unused-classes";
import globals from "globals";
// eslint-disable-next-line import/no-unresolved
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist/**"],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
      /* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      jsxA11y.flatConfigs.recommended,
      comments.recommended,
      eslintConfigPrettier,
    ],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "tss-unused-classes": tssUnusedClasses,
    },

    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },

    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      /* eslint-enable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */

      globals: {
        ...globals.browser,
      },

      sourceType: "commonjs",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: {
          defaultProject: "tsconfig.json",
          allowDefaultProject: ["eslint.config.mjs", ".prettierrc.cjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      ...reactHooks.configs.recommended.rules,

      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          minimumDescriptionLength: 10,
        },
      ],

      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-exports": "error",

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          fixStyle: "inline-type-imports",
        },
      ],

      "@typescript-eslint/no-import-type-side-effects": "error",

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "./src/demo/**",
            "./src/**/__tests__/**",
            "vite.config.mts",
            "eslint.config.mjs",
          ],
          includeTypes: true,
        },
      ],

      "import/no-mutable-exports": "error",
      "import/no-unused-modules": "error",

      "import/no-duplicates": [
        "error",
        {
          "prefer-inline": true,
        },
      ],

      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],

      "no-restricted-imports": "off",

      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "lodash",
              message:
                'Please use specific module imports like "lodash/foo" instead of "lodash".',
              allowTypeImports: true,
            },
            {
              name: "@mui/icons-material",
              message:
                "Please use second-level default path imports rather than top-level named imports. See https://github.com/sjdemartini/mui-tiptap/issues/154",
            },
          ],

          patterns: [
            {
              group: ["@mui/*/*/*"],
              message:
                'Imports of third-level MUI "private" paths are not allowed per https://mui.com/material-ui/guides/minimizing-bundle-size/#option-one-use-path-imports',
            },
          ],
        },
      ],

      "react/button-has-type": "error",

      "react/function-component-definition": "warn",

      "react/jsx-no-useless-fragment": [
        "warn",
        {
          allowExpressions: true,
        },
      ],

      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],

      "tss-unused-classes/unused-classes": "warn",
    },
  }
);
