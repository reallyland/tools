#!/bin/sh

NPM_BIN=$(npm bin)
NPM_ROOT=$(npm root)

"$NPM_BIN"/package-check && \
"$NPM_BIN"/nano-staged --config "$NPM_ROOT"/@reallyland/tools/.nano-staged.json && \
"$NPM_BIN"/tsc --noEmit
