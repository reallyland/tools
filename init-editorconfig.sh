#!/bin/sh

DIRNAME="$(dirname "$0")"
CONTENT="$(cat "$DIRNAME/.editorconfig")"

printf "%s\n" "$CONTENT" > ./.editorconfig
