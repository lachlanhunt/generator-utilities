import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint, { configs as tseslintConfigs } from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    {
        ignores: [".husky/", ".vscode/", ".yarn/", "lib/", "node_modules/", "spec/", ".pnp.*"],
    },
    {
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                project: "./tsconfig.json",
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    pluginJs.configs.recommended,
    // tseslint.configs.recommended,
    tseslintConfigs.recommendedTypeChecked,
    // tseslintConfigs.strict,
    // tseslintConfigs.strictTypeChecked,
    {
        rules: {
            "@typescript-eslint/no-unnecessary-condition": ["error", { allowConstantLoopConditions: true }],
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/consistent-type-exports": "error",
        },
    },
    // tseslintConfigs.stylistic,
    tseslintConfigs.stylisticTypeChecked,
    {
        rules: {
            "@typescript-eslint/consistent-type-definitions": "off",
        },
    },

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    importPlugin.flatConfigs.recommended,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    importPlugin.flatConfigs.typescript,
    {
        settings: {
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"],
            },
            "import/resolver": {
                typescript: {},
            },
            "import/resolver-next": [
                createTypeScriptImportResolver({
                    alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                }),
            ],
        },
    },
    eslintPluginPrettierRecommended,
);
