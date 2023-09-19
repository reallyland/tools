#!/bin/sh

[ -n "$CI" ] && exit 0;

if [ -f "$(npm root)/.bin/husky" ]; then
  husky install
else
  npm x -y --package=husky@latest -- husky install
fi
