import { getInfo } from '@changesets/get-github-info';

import { isOptionsValid } from './is-options-valid.js';
import type { GetDependencyReleaseLineFn } from './types.js';

export const getDependencyReleaseLine: GetDependencyReleaseLineFn = async (
  changesetWithCommitList,
  dependencyUpdatedList,
  changelogOptions
) => {
  if (!isOptionsValid(changelogOptions) || dependencyUpdatedList.length === 0) return '';

  const commitInfoTaskList = changesetWithCommitList.map(async (changeset) => {
    if (!changeset.commit) return '';

    const { links } = await getInfo({
      commit: changeset.commit,
      repo: changelogOptions.repo,
    });

    return links.commit;
  });
  const commitInfoList = await Promise.all(commitInfoTaskList);

  const commitInfoListStr = commitInfoList.filter(n => n).join(', ');
  const updatedDependenciesList = dependencyUpdatedList.map(
    dep => `  * ${dep.name}@${dep.newVersion}`
  );
  const depLen = updatedDependenciesList.length;

  const dependencyReleaseLine = [
    `* ${depLen} updated ${
      depLen > 1 ? 'dependencies' : 'dependency'}${commitInfoListStr ? ` [${commitInfoListStr}]` : ''
    }:`,
    ...updatedDependenciesList,
  ].join('\n');

  return dependencyReleaseLine;
};
