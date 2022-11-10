import { describe, expect, it } from 'vitest';

import { defaultLineTemplate } from '../constants.js';
import { formatLineTemplate } from '../format-line-template.js';
import { getInfoFromPullRequestWithCommitPrUserMock } from '../mocks/mocks.js';
import type { FormatLineTemplateInit } from '../types.js';

describe(formatLineTemplate.name, () => {
  const commit = String(getInfoFromPullRequestWithCommitPrUserMock.links.commit);
  const pull = String(getInfoFromPullRequestWithCommitPrUserMock.links.pull);
  const users = String(getInfoFromPullRequestWithCommitPrUserMock.links.user);
  const defaultInit: FormatLineTemplateInit = {
    commit,
    lines: 'fix: patch',
    pull,
    template: defaultLineTemplate,
    users,
  };

  it('formats line template', () => {
    const result = formatLineTemplate(defaultInit);

    expect(result).toBe(`\n\n* ${pull} ${commit} (${users}) fix: patch`);
  });

  it('formats custom line template', () => {
    const result = formatLineTemplate({
      ...defaultInit,
      template: '* {lines}',
    });

    expect(result).toBe(`\n\n* fix: patch`);
  });

  it('formats line template with no values', () => {
    const result = formatLineTemplate({
      ...defaultInit,
      commit: '',
      pull: '',
      users: '',
    });

    expect(result).toBe(`\n\n* fix: patch`);
  });

});
