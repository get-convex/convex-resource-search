'use client';

import algoliasearch from 'algoliasearch/lite';
import { Index, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import HitList from './HitList';

const searchClient = algoliasearch(
  '1KIE511890',
  'd5802c3142d1d81cebdac1ccbb02ea9f'
);

const indexes = [
  {
    name: 'docs',
    title: 'Docs',
  },
  {
    name: 'stack',
    title: 'Stack',
  },
  {
    name: 'discord',
    title: 'Discord',
  },
];

export default function Search() {
  return (
    <InstantSearch searchClient={searchClient}>
      <div className="p-4">
        <header>
          <h1 className="text-5xl text-neutral-n2 stretch-max font-display">
            Convex Search
          </h1>
          <SearchBox className="my-4" />
        </header>

        {indexes.map(({ name, title }) => (
          <>
            <h1 className="mb-2 text-4xl text-neutral-n2">{title}</h1>
            <Index indexName={name}>
              <HitList />
            </Index>
          </>
        ))}
      </div>
    </InstantSearch>
  );
}
