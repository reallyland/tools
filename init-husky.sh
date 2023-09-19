#!/bin/sh

DIRNAME=$(dirname "$0")
CONFIG="$DIRNAME/.base.nano-staged.json"

printf "[INFO] Setting up husky & nano-staged...\n"

printf "[INFO] Running husky-init...\n"
pnpm dlx husky-init && pnpm install

printf "[INFO] Adding nano-staged.json...\n"
cp "$CONFIG" ./nano-staged.json

printf "[INFO] Adding scripts.{commit-msg,pre-commit,prepare} to root workspace...\n"
npm pkg set scripts.commit-msg="sh $(npm root)/@reallyland/tools/lint-commit.sh"
npm pkg set scripts.pre-commit="pnpm nano-staged --config ./.nano-staged.json"
npm pkg set scripts.prepare="sh $(npm root)/@reallyland/tools/prepare.sh"

printf "[INFO] Installing husky...\n"
pnpm prepare

printf "[INFO] husky & nano-staged is ready!\n"
