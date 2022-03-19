#!/bin/sh

CONFIG="./.eslintrc.json"
DEBUG=false
FIX=false

while getopts "c:d:f:" flag
do
  case "$flag" in
    c) CONFIG=${OPTARG} ;;
    d) DEBUG=true ;;
    f) FIX=true ;;
    *) printf "%s" "
usage: $0

[-c] Path to ESLint config file
[-d] Print debug messages
[-f] Apply ESLint fixes
" >&2
       exit 1 ;;
  esac
done

if [ "$DEBUG" = true ]; then
  printf "[DEBUG] CONFIG: %s\n[DEBUG] FIX: %s\n" "$CONFIG" "$FIX"
fi

if [ "$FIX" = true ]; then
  ./node_modules/.bin/eslint src/**/*.ts --ext .js,.jsx,.ts,.tsx --config "$CONFIG" --fix
else
  ./node_modules/.bin/eslint src/**/*.ts --ext .js,.jsx,.ts,.tsx --config "$CONFIG"
fi
