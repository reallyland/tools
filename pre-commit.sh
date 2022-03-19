#!/bin/sh

./node_modules/.bin/package-check && \
./node_modules/.bin/nano-staged --config ./node_modules/@reallyland/tools/.nano-staged.json && \
./node_modules/.bin/tsc --noEmit
