#!/bin/sh

NPM_ROOT=$(npm root)

npm x -y --package=@skypack/package-check@latest -- package-check && \
npm x -y --package=nano-staged@latest -- nano-staged --config "$NPM_ROOT"/@reallyland/tools/.nano-staged.json && \
npm x -- tsc --noEmit
