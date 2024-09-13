export type LinkType = 'replaced-by' | 'replaces' | 'refer' | 'seealso';

export interface ILink {
  other: string;
  type: LinkType;
}
