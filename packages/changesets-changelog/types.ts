import type { ModCompWithPackage, NewChangesetWithCommit, VersionType } from '@changesets/types';

export interface ChangelogOptions {
  linksTemplate?: string;
  repo: string;
}

export interface FormatLineTemplateInit {
  commit: string;
  lines: string;
  pull: string;
  template: string;
  users: string;
}

export type FormatLineType = FormatLineWithTypeInitUnion['formatType'];

export type FormatLineWithTypeInitUnion =
  | { formatType: 'line'; line: string; }
  | { formatType: 'user'; line: string[]; };

export type GetDependencyReleaseLineFn = (
  changesetsWithCommit: NewChangesetWithCommit[],
  dependenciesUpdated: ModCompWithPackage[],
  changelogOptions?: ChangelogOptions
) => Promise<string>;

export type GetReleaseLineFn = (
  changesetWithCommit: NewChangesetWithCommit,
  changesetType: VersionType,
  changelogOptions?: ChangelogOptions
) => Promise<string>;

export interface ParseSummaryResult {
  commitFromSummary: string;
  prFromSummary: string;
  summary: string;
  usersFromSummary: string[];
}
