#!/bin/sh

printf "[INFO] Setting up husky...\n"
pnpm dlx husky-init && pnpm install

printf "[INFO] Adding scripts.{commit-msg,pre-commit,prepare} to root workspace...\n"
npm pkg set scripts.commit-msg="sh $(npm root)/@reallyland/tools/lint-commit.sh"
npm pkg set scripts.pre-commit="sh $(npm root)/@reallyland/tools/lint-build.sh -c $(npm root)/@reallyland/tools/browser/.build.eslintrc.json"
npm pkg set scripts.prepare="sh $(npm root)/@reallyland/tools/prepare.sh"
