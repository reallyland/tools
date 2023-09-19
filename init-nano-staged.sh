#!/bin/sh

DIRNAME=$(dirname "$0")
CONFIG="$DIRNAME/.base.nano-staged.json"

printf "[INFO] Adding .nano-staged.json...\n"
cp "$CONFIG" ./nano-staged.json

printf "[INFO] nano-staged is ready!\n"
