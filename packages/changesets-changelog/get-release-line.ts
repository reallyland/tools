import { getInfo, getInfoFromPullRequest } from '@changesets/get-github-info';

import { defaultLineTemplate } from './constants.js';
import { formatLineTemplate } from './format-line-template.js';
import { formatLineWithType } from './format-line-with-type.js';
import { isOptionsValid } from './is-options-valid.js';
import { parseSummary } from './parse-summary.js';
import type { GetReleaseLineFn } from './types.js';

export const getReleaseLine: GetReleaseLineFn = async (
  changesetWithCommit,
  _changesetType,
  changelogOptions
) => {
 if (!isOptionsValid(changelogOptions) || !changesetWithCommit.summary) return '';

  const {
    commitFromSummary,
    prFromSummary,
    summary,
    usersFromSummary,
  } = parseSummary(changesetWithCommit.summary);

  const commitToFetchFrom = commitFromSummary || changesetWithCommit.commit;

  /**
   * P - pull
   * C - commit
   * R - result
   *
   * P C R
   * 0 0 0 -> no op
   * 0 1 C -> fetch commit
   * 1 x P -> fetch PR
   *
   * Both `commitInfo` and `prInfo` will contain all the links to the PR and commit in `.links`.
   *
   * See this [gist] for more info.
   * Also, `mergeCommit { commitUrl }` from the gql will return the commit of the squashed PR.
   *
   * [gist]: https://gist.github.com/mccutchen/9a0530a440470b4dee57c53284a18b52
   */
  const [
    commitInfo,
    prInfo,
  ] = await Promise.all([
    !prFromSummary && commitToFetchFrom ? await getInfo({
      commit: commitToFetchFrom,
      repo: changelogOptions.repo,
    }) : undefined,
    prFromSummary ? await getInfoFromPullRequest({
      pull: Number(prFromSummary),
      repo: changelogOptions.repo,
    }) : undefined,
  ]);

  const links = {
    commit: prInfo?.links.commit || commitInfo?.links.commit || '',
    pull: prInfo?.links.pull || commitInfo?.links.pull || '',
    user: prInfo?.links.user || commitInfo?.links.user || '',
  };

  const lines = formatLineWithType({ formatType: 'line', line: summary });
  const users = formatLineWithType({ formatType: 'user', line: usersFromSummary }) || links.user;
  const template = changelogOptions.linksTemplate || defaultLineTemplate;

  const releaseLine = formatLineTemplate({
    commit: links.commit,
    lines,
    pull: links.pull,
    template,
    users,
  });

  return releaseLine;
};
