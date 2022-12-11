import { bench, describe } from 'vitest';

import { getDependencyReleaseLine } from '../get-dependency-release-line.js';
import { changelogOptionsMock, changesetWithCommitMock, dependencyUpdatedMock } from '../mocks/mocks.js';

/**
 * FIXME: Skip benchmarking this module because not being able to mock the API calls.
 */
describe.skip(getDependencyReleaseLine.name, () => {
  const changelogOptionsWithCustomLinkTemplate: typeof changelogOptionsMock = {
    ...changelogOptionsMock,
    linksTemplate: '* {lines}',
  };
  const changesetWithCommitList: typeof changesetWithCommitMock[] = [changesetWithCommitMock];
  const changesetWithCommitList2: typeof changesetWithCommitMock[] = [changesetWithCommitMock, changesetWithCommitMock];
  const dependencyUpdatedList: typeof dependencyUpdatedMock[] = [dependencyUpdatedMock];
  const dependencyUpdatedList2: typeof dependencyUpdatedMock[] = [dependencyUpdatedMock, dependencyUpdatedMock];

  bench('1 changesetWithCommit + 1 updated dep + options', async () => {
    await getDependencyReleaseLine(
      changesetWithCommitList,
      dependencyUpdatedList,
      changelogOptionsMock
    );
  });

  bench('2 changesetWithCommit + 2 updated dep + options', async () => {
    await getDependencyReleaseLine(
      changesetWithCommitList2,
      dependencyUpdatedList2,
      changelogOptionsMock
    );
  });

  bench('1 changesetWithCommit + 1 updated dep + options + custom link template', async () => {
    await getDependencyReleaseLine(
      changesetWithCommitList,
      dependencyUpdatedList,
      changelogOptionsWithCustomLinkTemplate
    );
  });

  bench('2 changesetWithCommit + 2 updated dep + options', async () => {
    await getDependencyReleaseLine(
      changesetWithCommitList2,
      dependencyUpdatedList2,
      changelogOptionsWithCustomLinkTemplate
    );
  });
});
