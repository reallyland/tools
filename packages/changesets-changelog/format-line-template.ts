import type { FormatLineTemplateInit } from './types.js';

function sigilReplacer(match: string): string {
  const replaced = [
    ['!', '\n'],
    ['(', '('],
    [')', ')'],
    ['+', ' '],
  ].reduce((result, [sigil, value]) => {
    return result.replaceAll(sigil, value);
  }, match);

  return replaced;
}

function toRegExp(type: string): RegExp {
  return new RegExp(String.raw`{([+!()]*?)${type}([+!()]*?)}`, 'i');
}

function toReplacerFn(value: string) {
  return (_: string, leadingMatch: string, trailingMatch: string) => {
    if (value) {
      return [
        sigilReplacer(leadingMatch),
        value,
        sigilReplacer(trailingMatch),
      ].join('');
    }

    return '';
  };
}

const commitRe = toRegExp('commit');
const linesRe = toRegExp('lines');
const pullRe = toRegExp('pull');
const usersRe = toRegExp('users');

export function formatLineTemplate({
  commit,
  lines,
  pull,
  template,
  users,
}: FormatLineTemplateInit): string {

  const formatted = [
    '\n\n',
    template
      .replace(pullRe, toReplacerFn(pull))
      .replace(commitRe, toReplacerFn(commit))
      .replace(usersRe, toReplacerFn(users))
      .replace(linesRe, toReplacerFn(lines)),
  ].join('');

  return formatted;
}
