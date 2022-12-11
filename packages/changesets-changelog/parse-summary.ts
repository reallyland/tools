import type { NewChangesetWithCommit } from '@changesets/types';

import type { ParseSummaryResult } from './types.js';

export function parseSummary(
  summary: NewChangesetWithCommit['summary']
): ParseSummaryResult {
  let commitFromSummary = '';
  let prFromSummary = '';
  const usersFromSummary: string[] = [];

  const cleanSummary = summary
    .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
      if (!Number.isNaN(pr)) prFromSummary = pr;
      return '';
    })
    .replace(/^\s*commit:\s*(\S+)/im, (_, commit) => {
      commitFromSummary = commit;
      return '';
    })
    .replace(/^\s*(?:author|user):\s*@?(\S+)/gim, (_, user) => {
      usersFromSummary.push(user);
      return '';
    })
    .trim();

  return {
    commitFromSummary,
    prFromSummary,
    summary: cleanSummary,
    usersFromSummary,
  };
}
