#!/bin/sh

DIRNAME=$(dirname "$0")

CONFIG="$DIRNAME/.base.nano-staged.json"
PREPARE_SH="prepare.sh"
NANO_STAGED_JSON="nano-staged.json"

printf "[INFO] Setting up nano-staged & husky...\n"

printf "[INFO] Adding %s...\n" "$NANO_STAGED_JSON"
cp "$CONFIG" "./$NANO_STAGED_JSON"

printf "[INFO] Installing husky...\n"
sh "$DIRNAME/$PREPARE_SH"

printf "[INFO] Adding husky hooks...\n"
pnpm --package=husky@latest dlx husky add .husky/commit-msg "sh \$(npm root)/@reallyland/tools/lint-commit.sh"
pnpm --package=husky@latest dlx husky add .husky/pre-commit "pnpm --package=nano-staged@latest dlx nano-staged --config ./$NANO_STAGED_JSON"

printf "[INFO] Adding scripts.prepare to root workspace...\n"
npm pkg set scripts.prepare="sh \$(npm root)/@reallyland/tools/$PREPARE_SH"

printf "[INFO] nano-staged & husky is ready!\n"
