#!/bin/sh

DIRNAME="$(dirname "$0")"
CONTENT="$(cat "$DIRNAME/.npmrc")"

printf "%s\n" "$CONTENT" > ./.npmrc
