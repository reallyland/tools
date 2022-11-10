import { invalidOptionsErrorMessage } from './constants.js';
import type { ChangelogOptions } from './types';

export function isOptionsValid(options?: ChangelogOptions): options is ChangelogOptions {
  if (!options || !options.repo || typeof(options.repo) !== 'string') {
    throw new Error(invalidOptionsErrorMessage);
  }

  return !!options;
}
