import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // demo/ is standalone Node build tooling (CommonJS, run by bake-demo.sh), not
    // part of the app bundle. Linting it with the Next/TS ruleset only ever produced
    // no-require-imports noise on files that are correct as they are.
    "demo/**",
  ]),
]);

export default eslintConfig;
