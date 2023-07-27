#!/bin/sh

DIRNAME=$(dirname "$0")
CONFIG="$DIRNAME/.eslintrc.json"
DEBUG=false
FIX=false

while getopts "c:d:f:s:" flag
do
  case "$flag" in
    c) CONFIG=${OPTARG} ;;
    d) DEBUG=true ;;
    f) FIX=true ;;
    s) SRC=${OPTARG} ;;
    *) printf "%s" "
usage: $0

[-c] Path to ESLint config file
[-d] Print debug messages
[-f] Apply ESLint fixes
[-s] Path to source files
" >&2
       exit 1 ;;
  esac
done

if [ "$DEBUG" = true ]; then
  "$NPM_BIN"/eslint "${SRC:-src/**/*.ts}" --ext .js,.jsx,.ts,.tsx --config "$CONFIG" --debug --fix-dry-run

  printf "\n"
  printf "[DEBUG] CONFIG: %s\n" "$CONFIG"
  printf "[DEBUG] FIX: %s\n" "$FIX"
  printf "[DEBUG] SRC: %s\n" "$SRC"
elif [ "$FIX" = true ]; then
  npm x -y -- eslint "${SRC:-src/**/*.ts}" --ext .js,.jsx,.ts,.tsx --config "$CONFIG" --fix
else
  npm x -y -- eslint "${SRC:-src/**/*.ts}" --ext .js,.jsx,.ts,.tsx --config "$CONFIG"
fi
