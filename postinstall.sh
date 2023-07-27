#!/bin/sh

DIRNAME="$(dirname "$0")"
POSTINSTALL_SCRIPT="$DIRNAME/postinstall.mjs"

# NPM_MAJOR_VERSION=$(npm -v | cut -d '.' -f 1)
NPM_MAJOR_VERSION=$(npm -v | awk -F . '{print $1}')

if [ "$NPM_MAJOR_VERSION" -gt 6 ]; then
  npm x -y -- zx@latest "$POSTINSTALL_SCRIPT"
else
  if [ -f "pnpm-lock.yaml" ]; then
    rm -rf .git/hooks
    sh ${__dirname}/simple-git-hooks.sh
  else
    npx -y -- zx@latest "$POSTINSTALL_SCRIPT"
  fi
fi
