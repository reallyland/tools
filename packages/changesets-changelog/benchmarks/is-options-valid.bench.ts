import { bench, describe } from 'vitest';

import { isOptionsValid } from '../is-options-valid.js';
import { changelogOptionsMock } from '../mocks/mocks.js';

describe(isOptionsValid.name, () => {
  bench('default', () => {
    isOptionsValid(changelogOptionsMock);
  });

  bench('error', () => {
    try {
      isOptionsValid();
    } catch {
      /** no op */
    }
  });
});
