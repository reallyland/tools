<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">@reallyland/tools</h1>

  <p>A collection of opinionated tools for the Reallyland projects</p>
</div>

<hr />

> This repo is used to host a collections of tools to help reduce the maintenance effort in multiple Reallyland projects.

## Table of contents

- [Table of contents](#table-of-contents)
- [Pre-requisites](#pre-requisites)
- [Tools available](#tools-available)
- [License](#license)

## Pre-requisites

- [Node.js][nodejs-url] >= 18.x
- [NPM][npm-url] >= 9.x ([NPM][npm-url] comes with [Node.js][nodejs-url], no separate installation is required.)

## Tools available

- ESLint config for `lit`, `vue`, and generic `TypeScript` projects
- Shell scripts to generate `.editorconfig`, `.gitattributes`, `.gitignore`, and `.npmrc`
- Shell scripts used for CI
- TSConfig (_NOTE: Copied and extended from `@reallyland/tsconfig` as TypeScript failed to resolve `extends` with nested dependencies within `node_modules`_)

## License

[MIT License](https://motss.mit-license.org/) © Rong Sen Ng (motss)

<!-- [MIT License](https://motss.mit-license.org/) © Rong Sen Ng (motss) -->

<!-- Links -->
[home.ts]: /src/home.ts
[sitemap.xml]: /assets/sitemap.xml

<!-- References -->
[typescript-url]: https://github.com/Microsoft/TypeScript
[nodejs-url]: https://nodejs.org
[npm-url]: https://www.npmjs.com
[node-releases-url]: https://nodejs.org/en/download/releases
[vscode-url]: https://code.visualstudio.com/
[vscode-lit-html-url]: https://github.com/mjbvz/vscode-lit-html

<!-- MDN -->
[array-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[function-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[regexp-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[set-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
