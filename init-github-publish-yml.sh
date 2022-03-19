#!/bin/sh

DIRNAME="$(dirname "$0")"
CONTENT="$(cat "$DIRNAME/.github/workflows/publish.yml")"
DEST_DIR="./.github2/workflows"

if [ -z "$DEST" ]; then
  printf "[INFO] %s\n" "Creating $DEST_DIR..."

  mkdir -p "$DEST_DIR"
fi

DEST_FILE="$DEST_DIR/publish.yml"

printf "[INFO] %s\n" "Creating $DEST_FILE..."

printf "%s\n" "$CONTENT" > "$DEST_FILE"

printf "[INFO] %s\n" "Done."
