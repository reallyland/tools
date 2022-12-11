import { bench, describe } from 'vitest';

import { changesetWithCommitCommitPrUserSummaryMock, changesetWithCommitMock } from '../mocks/mocks.js';
import { parseSummary } from '../parse-summary.js';

const defaultSummary = changesetWithCommitCommitPrUserSummaryMock.summary;
const simpleSummary = changesetWithCommitMock.summary;

describe(parseSummary.name, () => {
  bench('default', () => {
    parseSummary(defaultSummary);
  });

  bench('empty summary', () => {
    parseSummary('');
  });

  bench('simple', () => {
    parseSummary(simpleSummary);
  });
});
