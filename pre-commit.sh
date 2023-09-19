#!/bin/sh

debug=false
nanoStaged=false
nanoStagedConfig="$(npm root)/@reallyland/tools/nano-staged.json"
packageCheck=false
typeCheck=false

while getopts "cdhnpt" flag
do
  case "$flag" in
    c) nanoStagedConfig=${OPTARG} ;;
    d) debug=true ;;
    n) nanoStaged=true ;;
    p) packageCheck=true ;;
    t) typeCheck=true ;;
    *) printf "%s" "
usage: $0

[-c] Path to nano-staged's config file, e.g. -c ./nano-staged.json
[-n] If TRUE, run nano-staged, e.g. -n
[-p] If TRUE, run package-check, e.g. -p
[-t] If TRUE, run tsc, e.g. -t

[-d] Print debug messages
" >&2
       exit 1 ;;
  esac
done

if [ "$debug" = true ]; then
  printf "[DBEUG] Flag values:-\nc: %s\nn: %s\np: %s\nt: %s\n" "$nanoStagedConfig" "$nanoStaged" "$packageCheck" "$typeCheck"
else
  printf "[INFO] pre-commit done!\n"
fi

if [ "$packageCheck" = true ]; then
  pnpm --package=@skypack/package-check@latest dlx package-check
fi

if [ "$typeCheck" = true ]; then
  pnpm tsc --noEmit
fi

if [ "$nanoStaged" = true ]; then
  pnpm --package=nano-staged@latest dlx nano-staged --config "$nanoStagedConfig"
fi
