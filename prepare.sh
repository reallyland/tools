#!/bin/sh

[ -n "$CI" ] && exit 0;

pnpm --package=husky@latest dlx husky install
