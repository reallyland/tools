#!/bin/sh

[ -n "$CI" ] && exit 0;

npm x -y --package=husky@latest -- husky install
