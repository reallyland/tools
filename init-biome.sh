#!/bin/sh

DIRNAME=$(dirname "$0")
CONFIG="$DIRNAME/.base.biome.json"

printf "[INFO] Adding biome.json...\n"
cp "$CONFIG" ./biome.json

printf "[INFO] Adding scripts.{fmt,fmt-check} to root workspace...\n"
npm pkg set scripts.fmt="biome format --write --verbose ."
npm pkg set scripts.fmt-check="biome format --verbose ."
