#!/bin/sh

DIRNAME="$(dirname "$0")"

sh "$DIRNAME"/init-editorconfig.sh
sh "$DIRNAME"/init-gitattributes.sh
sh "$DIRNAME"/init-gitignore.sh
sh "$DIRNAME"/init-npmrc.sh
