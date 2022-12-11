import type { FormatLineWithTypeInitUnion } from './types.js';

export function formatLineWithType({
  formatType,
  line,
}: FormatLineWithTypeInitUnion): string {
  switch (formatType) {
    case 'line': {
      const [firstLine, ...otherLines] =
        line.split(/\r?\n/).map(l => l.trimEnd());
      const formattedOtherLines = otherLines.map(
        (l) => `  ${l}`
      ).join('\n');
      const formattedLines = `${firstLine}\n${formattedOtherLines}${otherLines.length ? '\n' : ''}`;

      return formattedLines;
    }
    case 'user': {
      const userStr = line.map(
        n => `[@${n}](https://github.com/${n})`
      ).join(', ');

      return userStr;
    }
  }
}
