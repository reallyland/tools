import { bench, describe } from 'vitest';

import { getReleaseLine } from '../get-release-line.js';
import { changelogOptionsMock, changesetWithCommitMock, changesetWithCommitMultipleReleasesMultilineSummaryMock } from '../mocks/mocks.js';

const customChangelogOptions: typeof changelogOptionsMock = {
  ...changelogOptionsMock,
  linksTemplate: '* {lines}',
};

describe.skip(getReleaseLine.name, () => {
  bench('default', async () => {
    await getReleaseLine(changesetWithCommitMock, 'patch', changelogOptionsMock);
  });

  bench('multiple releases + multiline summary', async () => {
    await getReleaseLine(changesetWithCommitMultipleReleasesMultilineSummaryMock, 'patch', changelogOptionsMock);
  });

  bench('default + custom options', async () => {
    await getReleaseLine(changesetWithCommitMock, 'patch', customChangelogOptions);
  });

  bench('multiple releases + multiline summary + custom options', async () => {
    await getReleaseLine(changesetWithCommitMultipleReleasesMultilineSummaryMock, 'patch', customChangelogOptions);
  });
});
