#!/bin/sh

DIRNAME="$(dirname "$0")"
IGNORE_FILE=".npmignore"

if [ -f "$DIRNAME/.gitignore" ]; then
  IGNORE_FILE=".gitignore"
fi

CONTENT="$(cat "$DIRNAME/$IGNORE_FILE")"

printf "%s\n" "$CONTENT" > ./.gitignore
