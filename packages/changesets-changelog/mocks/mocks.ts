import type { getInfo, getInfoFromPullRequest } from '@changesets/get-github-info';

import type { GetDependencyReleaseLineFn } from '../types.js';

type ChangelogOptions = NonNullable<FnParams['2']>;
type ChangesetWithCommit = FnParams['0'][number];
type DependencyUpdated = FnParams['1'][number];
type FnParams = Parameters<GetDependencyReleaseLineFn>;

export const changelogOptionsMock: ChangelogOptions = {
  repo: 'org/name',
};

export const changesetWithCommitMock: ChangesetWithCommit = {
  commit: 'd2e779b',
  id: 'cold-pans-try',
  releases: [
    {
      name: '@scoped/pkg-a',
      type: 'patch',
    },
  ],
  summary: 'fix: patch',
};
export const changesetWithCommitCommitSummaryMock: ChangesetWithCommit = {
  ...changesetWithCommitMock,
  summary: 'commit:d2e779b fix: patch',
};
export const changesetWithCommitEmptyCommitMock: ChangesetWithCommit = {
  ...changesetWithCommitMock,
  commit: '',
};
export const changesetWithCommitMultipleReleasesMock: ChangesetWithCommit = {
  commit: 'd2e669b',
  id: 'cold-pans-try',
  releases: [
    {
      name: '@scoped/pkg-a',
      type: 'patch',
    },
    {
      name: '@scoped/pkg-b',
      type: 'patch',
    },
  ],
  summary: 'fix: patch',
};
export const changesetWithCommitMultipleReleasesMultilineSummaryMock: ChangesetWithCommit = {
  commit: 'd2e669b',
  id: 'cold-pans-try',
  releases: [
    {
      name: '@scoped/pkg-a',
      type: 'patch',
    },
    {
      name: '@scoped/pkg-b',
      type: 'patch',
    },
  ],
  summary: 'fix: patch\nother line 1\nother line 2',
};
export const changesetWithCommitPrSummaryMock: ChangesetWithCommit = {
  ...changesetWithCommitMock,
  summary: 'pr:#1 fix: patch',
};
export const changesetWithCommitPrSummaryButWrongCommitMock: ChangesetWithCommit = {
  ...changesetWithCommitMock,
  summary: 'pr:#1 commit:123 fix: patch',
};
export const changesetWithCommitCommitPrUserSummaryMock: ChangesetWithCommit = {
  ...changesetWithCommitMock,
  summary: 'pr:#1 commit:123 user:@user-a\nuser:@user-b fix: patch',
};

export const changesetWithCommitListMock: FnParams['0'] = [
  changesetWithCommitEmptyCommitMock,
  changesetWithCommitMock,
  changesetWithCommitMultipleReleasesMock,
];

export const dependencyUpdatedMock: DependencyUpdated = {
  changesets: ['cold-pans-try'],
  dir: '/root/org/name/packages/pkg-a',
  name: '@scoped/pkg-a',
  newVersion: '0.0.1',
  oldVersion: '0.0.2',
  packageJson: {
    name: '@scoped/pkg-a',
    version: '0.0.1',
  },
  type: 'patch',
};
export const dependencyUpdated2Mock: DependencyUpdated = {
  changesets: ['cold-pans-try'],
  dir: '/root/org/name/packages/pkg-b',
  name: '@scoped/pkg-b',
  newVersion: '0.0.1',
  oldVersion: '0.0.2',
  packageJson: {
    name: '@scoped/pkg-b',
    version: '0.0.1',
  },
  type: 'patch',
};

export const dependencyUpdatedListMock: DependencyUpdated[] = [
  dependencyUpdatedMock,
  dependencyUpdated2Mock,
];

export const getInfoFromPullRequestMock: Awaited<ReturnType<typeof getInfoFromPullRequest>> = {
  commit: '',
  links: {
    commit: '',
    pull: '',
    user: '',
  },
  user: '',
};
export const getInfoFromPullRequestWithCommitPrUserMock: Awaited<ReturnType<typeof getInfoFromPullRequest>> = {
  commit: '',
  links: {
    commit: '[d2e779b](https://github.com/org/name/commits/d2e779b)',
    pull: '[1](https://github.com/org/name/pull/1)',
    user: '[user-a](https://github/user-a)',
  },
  user: '',
};

export const getInfoResultMock: Awaited<ReturnType<typeof getInfo>> = {
  links: {
    commit: '',
    pull: '',
    user: '',
  },
  pull: 1,
  user: '',
};
export const getInfoResultWithCommitMock: Awaited<ReturnType<typeof getInfo>> = {
  links: {
    commit: '[d2e779b](https://github.com/org/name/commits/d2e779b)',
    pull: '',
    user: '[user-a](https://github/user-a)',
  },
  pull: 1,
  user: '',
};
