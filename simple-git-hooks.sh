#!/bin/sh

DIRNAME=$(dirname "$0")

./node_modules/.bin/simple-git-hooks "$DIRNAME"/.simple-git-hooks.json
