export type BaseHit = {
  title: string;
  __position: number;
};

export type DocsHit = BaseHit & {
  // The URL of the docs page.
  objectID: string;
  contents: string;
};

export type StackHit = BaseHit & {
  // The slug of the Stack page (e.g. /my-page).
  objectID: string;
  summary: string;
  content: string;
  tags: string[];
};

export type DiscordHit = BaseHit & {
  channel: string;
  date: number;
  messages: {
    author: {
      avatar: string;
      convexer: boolean;
      name: string;
    };
    body: string;
  }[];
};

export type SearchHit = DocsHit | StackHit | DiscordHit;

export function isDocsHit(hit: SearchHit): hit is DocsHit {
  return (hit as DocsHit).contents !== undefined;
}

export function isStackHit(hit: SearchHit): hit is StackHit {
  return (hit as StackHit).summary !== undefined;
}

export function isDiscordHit(hit: SearchHit): hit is DiscordHit {
  return (hit as DiscordHit).messages !== undefined;
}
