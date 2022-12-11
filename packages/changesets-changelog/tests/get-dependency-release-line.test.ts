import * as getGithubInfo from '@changesets/get-github-info';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { invalidOptionsErrorMessage } from '../constants.js';
import { getDependencyReleaseLine } from '../get-dependency-release-line.js';
import { changelogOptionsMock, changesetWithCommitListMock, dependencyUpdatedListMock, dependencyUpdatedMock, getInfoResultMock } from '../mocks/mocks.js';

/**
 * NOTE: See this cool trick at [SO].
 *
 * SO: https://stackoverflow.com/questions/53162001/typeerror-during-jests-spyon-cannot-set-property-getrequest-of-object-which
 */
vi.mock('@changesets/get-github-info');

const getInfo = vi.spyOn(getGithubInfo, 'getInfo');

describe(getDependencyReleaseLine.name, () => {
  beforeEach(() => {
    getInfo.mockResolvedValue(getInfoResultMock);
  });

  it.each<{
    expected: string;
    testDepLen: number;
    testDeps: typeof dependencyUpdatedListMock;
  }>([
    {
      expected: [
        '* 2 updated dependencies:',
        '  * @scoped/pkg-a@0.0.1',
        '  * @scoped/pkg-b@0.0.1',
      ].join('\n'),
      testDepLen: dependencyUpdatedListMock.length,
      testDeps: dependencyUpdatedListMock,
    },
    {
      expected: [
        '* 1 updated dependency:',
        '  * @scoped/pkg-a@0.0.1',
      ].join('\n'),
      testDepLen: 1,
      testDeps: [dependencyUpdatedMock],
    },
  ])('returns updated dependencies lines label (depLen=$testDepLen)', async ({
    expected,
    testDeps,
  }) => {
    const result = await getDependencyReleaseLine(
      changesetWithCommitListMock,
      testDeps,
      changelogOptionsMock
    );

    expect(result).toBe(expected);
  });

  it('returns updated dependencies with commit', async () => {
    getInfo.mockImplementation(async ({ commit }) => {
      return {
        ...getInfoResultMock,
        links: {
          ...getInfoResultMock.links,
          commit,
        },
      };
    });

    const expectedCommits = changesetWithCommitListMock.map(n => n.commit).filter(n => n).join(', ');
    const expected = [
      `* 2 updated dependencies [${expectedCommits}]:`,
      '  * @scoped/pkg-a@0.0.1',
      '  * @scoped/pkg-b@0.0.1',
    ].join('\n');

    const result = await getDependencyReleaseLine(
      changesetWithCommitListMock,
      dependencyUpdatedListMock,
      changelogOptionsMock
    );

    expect(result).toBe(expected);
  });

  it('returns empty string when there are no updated dependencies', async () => {
    const result = await getDependencyReleaseLine(
      changesetWithCommitListMock,
      [],
      changelogOptionsMock
    );

    expect(result).toBe('');
  });

  it('throws error', async () => {
    try {
      await getDependencyReleaseLine(
        changesetWithCommitListMock,
        dependencyUpdatedListMock,
        undefined
      );
      expect.fail(`thou shan't pass!`);
    } catch (error) {
      expect(error).toEqual(new Error(invalidOptionsErrorMessage));
    }
  });

});
