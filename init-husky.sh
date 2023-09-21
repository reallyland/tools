#!/bin/sh

DIRNAME=$(dirname "$0")

PREPARE_SH="prepare.sh"

# FIXME: Workaround for https://github.com/reallyland/tools/issues/19
printf "[INFO] Installing required dependencies...\n"
pnpm add -Dw @biomejs/biome @skypack/package-check eslint husky nano-staged

printf "[INFO] Setting up husky...\n"
sh "$DIRNAME/$PREPARE_SH"

printf "[INFO] Setting up husky hooks...\n"
husky set .husky/commit-msg "sh \$(npm root)/@reallyland/tools/lint-commit.sh"
husky set .husky/pre-commit "\
package-check && \\
tsc --noEmit && \\
nano-staged --config \$(npm root)/@reallyland/tools/nano-staged.json\
"

printf "[INFO] Adding scripts.prepare to root workspace...\n"
npm pkg set scripts.fmt="biome format --write --config-path \$(npm root)/@reallyland/tools"
npm pkg set scripts.lint-build="eslint --ext .js,.jsx,.ts,.tsx --config \$(npm root)/@reallyland/tools/.build.eslintrc.json --fix"
npm pkg set scripts.prepare="sh \$(npm root)/@reallyland/tools/$PREPARE_SH"

printf "[INFO] husky is ready!\n"
