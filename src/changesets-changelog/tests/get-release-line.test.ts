import * as getGithubInfo from '@changesets/get-github-info';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { invalidOptionsErrorMessage } from '../constants.js';
import { getReleaseLine } from '../get-release-line.js';
import {
  changelogOptionsMock,
  changesetWithCommitCommitPrUserSummaryMock,
  changesetWithCommitCommitSummaryMock,
  changesetWithCommitMock,
  changesetWithCommitMultipleReleasesMultilineSummaryMock,
  changesetWithCommitPrSummaryButWrongCommitMock,
  changesetWithCommitPrSummaryMock,
  getInfoFromPullRequestMock,
  getInfoFromPullRequestWithCommitPrUserMock,
  getInfoResultMock,
  getInfoResultWithCommitMock,
} from '../mocks/mocks.js';
import type { ChangelogOptions } from '../types.js';

vi.mock('@changesets/get-github-info');

const getInfo = vi.spyOn(getGithubInfo, 'getInfo');
const getInfoFromPullRequest = vi.spyOn(getGithubInfo, 'getInfoFromPullRequest');

function toExpectedResult(lines: string[]): string {
  return [
    '\n\n',
    ...lines.map(n => `${n.trim()}\n`),
  ].join('');
}

describe(getReleaseLine.name, () => {
  beforeEach(() => {
    getInfo.mockResolvedValue(getInfoResultMock);
    getInfoFromPullRequest.mockResolvedValue(getInfoFromPullRequestMock);
  });

  it('returns release lines label', async () => {
    const expected = toExpectedResult([
      '* fix: patch\n',
    ]);

    const result = await getReleaseLine(
      changesetWithCommitMock,
      'patch',
      changelogOptionsMock
    );

    expect(result).toBe(expected);
  });

  it.each<{
    expected: string;
    message: string;
    testChangelogOptions?: ChangelogOptions;
    testChangesetWithCommit: typeof changesetWithCommitMock;
    testCommitInfo?: typeof getInfoResultWithCommitMock;
    testPrInfo?: typeof getInfoFromPullRequestWithCommitPrUserMock;
  }>([
    {
      expected: toExpectedResult([`* ${getInfoResultWithCommitMock.links.commit} (${getInfoResultWithCommitMock.links.user}) fix: patch\n`]),
      message: '/w commit summary',
      testChangesetWithCommit: changesetWithCommitCommitSummaryMock,
      testCommitInfo: getInfoResultWithCommitMock,
    },
    {
      expected: toExpectedResult([`* ${getInfoFromPullRequestWithCommitPrUserMock.links.pull} ${getInfoFromPullRequestWithCommitPrUserMock.links.commit} (${getInfoResultWithCommitMock.links.user}) fix: patch\n`]),
      message: '/w pr summary',
      testChangesetWithCommit: changesetWithCommitPrSummaryMock,
      testPrInfo: getInfoFromPullRequestWithCommitPrUserMock,
    },
    {
      expected: toExpectedResult([`* ${getInfoFromPullRequestWithCommitPrUserMock.links.pull} ${getInfoFromPullRequestWithCommitPrUserMock.links.commit} (${getInfoResultWithCommitMock.links.user}) fix: patch\n`]),
      message: '/w pr summary but wrong commit',
      testChangesetWithCommit: changesetWithCommitPrSummaryButWrongCommitMock,
      testPrInfo: getInfoFromPullRequestWithCommitPrUserMock,
    },
    {
      expected: toExpectedResult([`* fix: patch\n`]),
      message: 'w/o pr, commit, and user summary',
      testChangesetWithCommit: changesetWithCommitMock,
    },
    {
      expected: toExpectedResult([`* ${getInfoFromPullRequestWithCommitPrUserMock.links.pull} ${getInfoFromPullRequestWithCommitPrUserMock.links.commit} ([@user-a](https://github.com/user-a), [@user-b](https://github.com/user-b)) fix: patch\n`]),
      message: 'w/ pr, commit, and user summary',
      testChangesetWithCommit: changesetWithCommitCommitPrUserSummaryMock,
      testPrInfo: getInfoFromPullRequestWithCommitPrUserMock,
    },
    {
      expected: toExpectedResult([`* fix: patch\n  other line 1\n  other line 2`]),
      message: '/w multiline summary',
      testChangesetWithCommit: changesetWithCommitMultipleReleasesMultilineSummaryMock,
      testCommitInfo: getInfoResultMock,
    },
    {
      expected: toExpectedResult([`* fix: patch`]),
      message: '/w optional options.linksTemplate',
      testChangelogOptions: {
        ...changelogOptionsMock,
        linksTemplate: '* {lines}',
      },
      testChangesetWithCommit: changesetWithCommitMock,
      testCommitInfo: getInfoResultWithCommitMock,
    },
  ])('returns release lines label containing pr info ($message)', async ({
    expected,
    testChangelogOptions,
    testChangesetWithCommit,
    testCommitInfo,
    testPrInfo,
  }) => {
    if (testCommitInfo) getInfo.mockResolvedValue(testCommitInfo);
    if (testPrInfo) getInfoFromPullRequest.mockResolvedValue(testPrInfo);

    const result = await getReleaseLine(
      testChangesetWithCommit,
      'patch',
      testChangelogOptions ?? changelogOptionsMock
    );

    expect(result).toBe(expected);
  });

  it('returns empty string when there is no summary', async () => {
    const result = await await getReleaseLine(
      {
        ...changesetWithCommitMock,
        summary: '',
      },
      'patch',
      changelogOptionsMock
    );

    expect(result).toBe('');
  });

  it('throws error', async () => {
    try {
      await getReleaseLine(
        changesetWithCommitMock,
        'patch',
        undefined
      );
      expect.fail(`thou shan't pass!`);
    } catch (error) {
      expect(error).toEqual(new Error(invalidOptionsErrorMessage));
    }
  });

});
