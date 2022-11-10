import { describe, expect, it } from 'vitest';

import { formatLineWithType } from '../format-line-with-type.js';
import type { FormatLineWithTypeInitUnion } from '../types.js';

type FormatLineTestCase =
  | { expected: string; formatType: 'line'; line: string; message: string; }
  | { expected: string; formatType: 'user'; line: string[]; message: string; };

describe(formatLineWithType.name, () => {
  it.each<FormatLineTestCase>([
    {
      expected: 'fix: patch\n',
      formatType: 'line',
      line: 'fix: patch',
      message: 'single line',
    },
    {
      expected: 'fix: patch\n  other line 1\n  other line 2\n',
      formatType: 'line',
      line: 'fix: patch\nother line 1\nother line 2',
      message: 'multiline',
    },
    {
      expected: '[@user-a](https://github.com/user-a)',
      formatType: 'user',
      line: ['user-a'],
      message: 'single user',
    },
    {
      expected: '[@user-a](https://github.com/user-a), [@user-b](https://github.com/user-b)',
      formatType: 'user',
      line: ['user-a', 'user-b'],
      message: 'multiple users',
    },
  ])('formats line with format type ($message)', ({
    expected,
    formatType,
    line,
  }) => {
    const result = formatLineWithType({
      formatType,
      line,
    } as FormatLineWithTypeInitUnion);

    expect(result).toBe(expected);
  });
});
