'use client';

import algoliasearch from 'algoliasearch/lite';
import { Index, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import HitList from './HitList';

const searchClient = algoliasearch(
  '1KIE511890',
  'd5802c3142d1d81cebdac1ccbb02ea9f'
);

export default function Search() {
  return (
    <div className="p-4 bg-slate-500">
      <h1 className="text-5xl">Convex Search</h1>
      <InstantSearch searchClient={searchClient}>
        <SearchBox className="my-4" />
        <h1 className="text-4xl mb-2">Docs</h1>
        <Index indexName="docs">
          <HitList />
        </Index>
        <h1 className="text-4xl mb-2">Stack</h1>
        <Index indexName="stack">
          <HitList />
        </Index>
        <h1 className="text-4xl mb-2">Discord</h1>
        <Index indexName="discord">
          <HitList />
        </Index>
      </InstantSearch>
    </div>
  );
}
