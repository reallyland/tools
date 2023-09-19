#!/bin/sh

DEFAULT_SRC="src"
DIRNAME=$(dirname "$0")
CONFIG="$DIRNAME/.eslintrc.json"
DEBUG=false
FIX=false

while getopts "c:dfhs:" flag
do
  case "$flag" in
    c) CONFIG=${OPTARG} ;;
    d) DEBUG=true ;;
    f) FIX=true ;;
    s) SRC=${OPTARG} ;;
    *) printf "%s" "
usage: $0

[-c] Path to ESLint config file
[-f] Apply ESLint fixes
[-s] Path to source files

[-d] Print debug messages
" >&2
       exit 1 ;;
  esac
done

if [ "$DEBUG" = true ]; then
  printf "[DEBUG] CONFIG: %s\n" "$CONFIG"
  printf "[DEBUG] FIX: %s\n" "$FIX"
  printf "[DEBUG] SRC: %s\n" "$SRC"
fi

if [ "$FIX" = true ]; then
  npm x -y --package=eslint@latest -- eslint "${SRC:-$DEFAULT_SRC}" --ext .js,.jsx,.ts,.tsx --config "$CONFIG" --fix
else
  npm x -y --package=eslint@latest -- eslint "${SRC:-$DEFAULT_SRC}" --ext .js,.jsx,.ts,.tsx --config "$CONFIG"
fi
