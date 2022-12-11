#!/bin/sh

rm -frvd ./**/**/.turbo # ./**/.turbo does not work.
rm -frvd ./node_modules/.cache/turbo
rm -frvd ./packages/**/coverage
rm -frvd ./packages/**/dist
rm -fvd ./**/*.tsbuildinfo
rm -fvd ./packages/**.d.ts
rm -fvd ./packages/**.d.ts.map
rm -fvd ./packages/**.js
rm -fvd ./packages/**.js.map
rm -fvd ./packages/**/*.tsbuildinfo
