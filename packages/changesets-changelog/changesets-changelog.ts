import type { ChangelogFunctions } from "@changesets/types";

import { getDependencyReleaseLine } from './get-dependency-release-line.js';
import { getReleaseLine } from './get-release-line.js';

export const changelogFunctions: ChangelogFunctions = {
  getDependencyReleaseLine,
  getReleaseLine: getReleaseLine as ChangelogFunctions['getReleaseLine'],
};
