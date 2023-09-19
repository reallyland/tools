#!/bin/sh

DIRNAME=$(dirname "$0")
CONFIG="$DIRNAME/.commitlintrc.json"
DEBUG=false

while getopts "c:d" flag
do
  case "$flag" in
    c) CONFIG=${OPTARG} ;;
    d) DEBUG=true ;;
    *) printf "%s" "
usage: $0

[-c] Path to ESLint config file

[-d] Print debug messages
" >&2
       exit 1 ;;
  esac
done

if [ "$DEBUG" = true ]; then
  printf "[DEBUG] CONFIG: %s\n" "$CONFIG"
fi

npm x -y --package=commitlint@latest -- commitlint --config "$CONFIG" --edit
