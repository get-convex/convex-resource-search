'use client';

import algoliasearch from 'algoliasearch/lite';
import { Index, InstantSearch } from 'react-instantsearch-hooks-web';
import HitList from './HitList';
import Image from 'next/image';
import SearchBox from './SearchBox';

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
      <header className="border-b border-neutral-n10 p-4 flex flex-col gap-4 lg:flex-row lg:gap-12">
        <Image src="/logo.svg" alt="Convex logo" width={320} height={36} />
        <SearchBox />
      </header>

      {indexes.map(({ name, title }) => (
        <>
          <h1 className="mb-2 text-4xl text-neutral-n2">{title}</h1>
          <Index indexName={name}>
            <HitList />
          </Index>
        </>
      ))}
    </InstantSearch>
  );
}
