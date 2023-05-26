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
    link: 'https://docs.convex.dev',
  },
  {
    name: 'stack',
    title: 'Stack',
    link: 'https://stack.convex.dev',
  },
  {
    name: 'discord',
    title: 'Discord',
    link: 'https://discord.com/invite/nk6C2qTeCq',
  },
];

export default function Search() {
  return (
    <InstantSearch searchClient={searchClient}>
      <header className="sticky top-0 z-10 flex h-32 flex-col justify-center gap-4 border-b border-neutral-n10 bg-neutral-n12 px-4 md:h-20 md:flex-row md:items-center md:gap-12">
        <Image src="/logo.svg" alt="Convex logo" width={320} height={36} />
        <SearchBox />
      </header>
      <main className="flex flex-col gap-12 p-4 xl:flex-row xl:gap-6">
        {indexes.map(({ name, title, link }) => (
          <div
            key={name}
            className="flex grow basis-0 flex-col md:max-w-2xl xl:overflow-hidden"
          >
            <a
              href={link}
              className="sticky top-32 mt-4 bg-neutral-n12 py-4 font-display text-2xl leading-none text-neutral-n2 underline-offset-4 shadow-lg stretch-max hover:underline md:top-2 xl:static xl:mt-0 xl:text-xl xl:font-bold"
              target="_blank"
            >
              {title}
            </a>
            <Index indexName={name}>
              <HitList />
            </Index>
          </div>
        ))}
      </main>
    </InstantSearch>
  );
}
