import { bench, describe } from 'vitest';

import { defaultLineTemplate } from '../constants.js';
import { formatLineTemplate } from '../format-line-template.js';

const customLineTemplate = '* {lines}';

describe(formatLineTemplate.name, () => {
  bench('custom line template + commit + pr + multiline', () => {
    formatLineTemplate({
      commit: '[d2e779b](https://github.com/org/name/commits/d2e779b)',
      pull: '[1](https://github.com/org/name/pull/1)',
      lines: 'fix: patch\nother line 1\n other line 2',
      template: customLineTemplate,
      users: '[user-a](https://github/user-a)',
    });
  });

  bench('custom line template + multiline', () => {
    formatLineTemplate({
      commit: '',
      pull: '',
      lines: 'fix: patch\nother line 1\n other line 2',
      template: customLineTemplate,
      users: '',
    });
  });

  bench('default line template + commit + pr + multiline', () => {
    formatLineTemplate({
      commit: '[d2e779b](https://github.com/org/name/commits/d2e779b)',
      pull: '[1](https://github.com/org/name/pull/1)',
      lines: 'fix: patch\nother line 1\n other line 2',
      template: defaultLineTemplate,
      users: '[user-a](https://github/user-a)',
    });
  });

  bench('default line template + multiline', () => {
    formatLineTemplate({
      commit: '',
      pull: '',
      lines: 'fix: patch\nother line 1\n other line 2',
      template: defaultLineTemplate,
      users: '',
    });
  });

  bench('custom line template + commit + pr + single line', () => {
    formatLineTemplate({
      commit: '[d2e779b](https://github.com/org/name/commits/d2e779b)',
      pull: '[1](https://github.com/org/name/pull/1)',
      lines: 'fix: patch',
      template: customLineTemplate,
      users: '[user-a](https://github/user-a)',
    });
  });

  bench('custom line template + single line', () => {
    formatLineTemplate({
      commit: '',
      pull: '',
      lines: 'fix: patch',
      template: customLineTemplate,
      users: '',
    });
  });

  bench('default line template + commit + pr + single line', () => {
    formatLineTemplate({
      commit: '[d2e779b](https://github.com/org/name/commits/d2e779b)',
      pull: '[1](https://github.com/org/name/pull/1)',
      lines: 'fix: patch',
      template: defaultLineTemplate,
      users: '[user-a](https://github/user-a)',
    });
  });

  bench('default line template + single line', () => {
    formatLineTemplate({
      commit: '',
      pull: '',
      lines: 'fix: patch',
      template: defaultLineTemplate,
      users: '',
    });
  });
});
