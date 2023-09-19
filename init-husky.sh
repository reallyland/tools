#!/bin/sh

DIRNAME=$(dirname "$0")

PREPARE_SH="prepare.sh"

printf "[INFO] Installing required dependencies...\n"
pnpm add -Dw @biomejs/biome eslint husky nano-staged

printf "[INFO] Setting up husky...\n"
sh "$DIRNAME/$PREPARE_SH"

printf "[INFO] Setting up husky hooks...\n"
pnpm husky set .husky/commit-msg "sh \$(npm root)/@reallyland/tools/lint-commit.sh"
pnpm husky set .husky/pre-commit "sh \$(npm root)/@reallyland/tools/pre-commit.sh -n -p -t"

printf "[INFO] Adding scripts.prepare to root workspace...\n"
npm pkg set scripts.fmt="pnpm biome format --write"
npm pkg set scripts.lint-build="pnpm eslint --ext .js,.jsx,.ts,.tsx --config \$(npm root)/@reallyland/tools/.build.eslintrc.json --fix"
npm pkg set scripts.prepare="sh \$(npm root)/@reallyland/tools/$PREPARE_SH"

printf "[INFO] husky is ready!\n"
