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
  printf "[DEBUG] Flag values:-\nc: %s\nn: %s\np: %s\nt: %s\n" "$nanoStagedConfig" "$nanoStaged" "$packageCheck" "$typeCheck"
fi

if [ "$packageCheck" = true ]; then
  if [ -f "$(npm root)/.bin/package-check" ]; then
    package-check
  else
    npm x -y --package=@skypack/package-check@latest -- package-check
  fi
fi

if [ "$typeCheck" = true ]; then
  tsc --noEmit
fi

if [ "$nanoStaged" = true ]; then
  if [ -f "$(npm root)/.bin/nano-staged" ]; then
    nano-staged --config "$nanoStagedConfig"
  else
    npm x -y --package=nano-staged@latest -- nano-staged --config "$nanoStagedConfig"
  fi
fi

printf "[INFO] pre-commit done!\n"
