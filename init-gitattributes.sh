#!/bin/sh

DIRNAME="$(dirname "$0")"
CONTENT="$(cat "$DIRNAME/.gitattributes")"

printf "%s" "$CONTENT" > ./.gitattributes
