import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  {
    extends: compat.extends(
      "next/core-web-vitals",
      "prettier",
      "next/typescript"
    ),
  },
]);
