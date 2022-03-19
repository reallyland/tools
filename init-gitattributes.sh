#!/bin/sh

DIRNAME="$(dirname "$0")"
CONTENT="$(cat "$DIRNAME/.gitattributes")"

printf "%s\n" "$CONTENT" > ./.gitattributes
