import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

const nextRules = {
  ...nextPlugin.configs.recommended.rules,
  ...nextPlugin.configs["core-web-vitals"].rules,
};

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.mjs", "**/*.cjs"],
    plugins: { "@next/next": nextPlugin },
    rules: nextRules,
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"] },
);
