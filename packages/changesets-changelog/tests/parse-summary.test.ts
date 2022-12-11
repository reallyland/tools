import { describe, expect, it } from 'vitest';

import { changesetWithCommitCommitPrUserSummaryMock, changesetWithCommitMock } from '../mocks/mocks.js';
import { parseSummary } from '../parse-summary.js';
import type { ParseSummaryResult } from '../types.js';

describe(parseSummary.name, () => {
  it('parses summary', () => {
    const result = parseSummary(changesetWithCommitCommitPrUserSummaryMock.summary);

    expect(result).toEqual<ParseSummaryResult>({
      commitFromSummary: '123',
      prFromSummary: '1',
      summary: 'fix: patch',
      usersFromSummary: ['user-a', 'user-b'],
    });
  });

  it('parses summary without commit, pr, and users', () => {
    const result = parseSummary(changesetWithCommitMock.summary);

    expect(result).toEqual<ParseSummaryResult>({
      commitFromSummary: '',
      prFromSummary: '',
      summary: 'fix: patch',
      usersFromSummary: [],
    });
  });
});
