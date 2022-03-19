#!/bin/sh

# NOTE: List all files with human readable size in the npm cache

NPM_CACHE_DIR="$(npm config get cache)"

if [ -d "$NPM_CACHE_DIR" ]; then
  FILES=$(ls -lhR "$NPM_CACHE_DIR")

  printf "::group::%s\n" "$FILES"
  printf "::endgroup::"
fi
