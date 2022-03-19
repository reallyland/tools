#!/bin/sh

DIRNAME="$(dirname "$0")"
CONTENT="$(cat "$DIRNAME/.gitignore")"

printf "%s" "$CONTENT" > ./.gitignore
