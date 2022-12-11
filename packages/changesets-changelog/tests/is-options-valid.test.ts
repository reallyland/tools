import { describe, expect, it } from 'vitest';

import { invalidOptionsErrorMessage } from '../constants.js';
import { isOptionsValid } from '../is-options-valid.js';
import type { ChangelogOptions } from '../types.js';

describe(isOptionsValid.name, () => {
  it.each<Partial<ChangelogOptions> | undefined>([
    undefined,
    {},
    { repo: '' },
    { repo: 1 } as unknown as ChangelogOptions,
  ])('is not a valid options', (testOptions) => {
    try {
      isOptionsValid(testOptions as ChangelogOptions);
      expect.fail('invalid options should throw');
    } catch (err) {
      expect(err).toEqual(new Error(invalidOptionsErrorMessage));
    }
  });

  it('is valid options', () => {
    try {
      const result = isOptionsValid({
        repo: 'org/name',
      });

      expect(result).toBeTruthy();
    } catch {
      expect.fail('options must be valid');
    }
  });
});
