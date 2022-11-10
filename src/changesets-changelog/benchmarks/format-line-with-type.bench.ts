import { bench, describe } from 'vitest';

import { formatLineWithType } from '../format-line-with-type.js';

describe(formatLineWithType.name, () => {
  bench('multiline', () => {
    formatLineWithType({ formatType: 'line', line: 'fix: patch\nother line 1\nother line 2' });
  });

  bench('single line', () => {
    formatLineWithType({ formatType: 'line', line: 'fix: patch' });
  });

  bench('multiple users', () => {
    formatLineWithType({ formatType: 'user', line: ['@user-1', '@user-2'] });
  });

  bench('single user', () => {
    formatLineWithType({ formatType: 'user', line: ['@user-1'] });
  });
});
