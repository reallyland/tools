#!/bin/sh

NPM_ROOT=$(npm root)

npm x -- package-check && \
npm x -- nano-staged --config "$NPM_ROOT"/@reallyland/tools/.nano-staged.json && \
npm x -- tsc --noEmit
