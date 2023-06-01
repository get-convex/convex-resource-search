'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Index, useSearchBox } from 'react-instantsearch-hooks-web';
import HitList from './HitList';
import SearchBox from './SearchBox';

const queryParam = 'q';

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
  const { refine } = useSearchBox();
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    refine(value);
    updateQueryParam(value);
  };

  const handleClear = () => {
    setQuery('');
    refine('');
    updateQueryParam('');
  };

  const updateQueryParam = (value: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (value) {
      urlParams.set(queryParam, value);
    } else {
      urlParams.delete(queryParam);
    }

    // Construct the updated URL.
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const newUrl = urlParams.toString()
      ? `${baseUrl}?${urlParams.toString()}`
      : baseUrl;

    // Update the URL without reloading.
    window.history.pushState({}, '', newUrl);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get(queryParam);
    setQuery(searchParam || '');
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-32 flex-col justify-center gap-4 border-b border-neutral-n10 bg-neutral-n12 px-4 md:h-20 md:flex-row md:items-center md:gap-12">
        <Image src="/logo.svg" alt="Convex logo" width={320} height={36} />
        <SearchBox
          value={query}
          onChange={handleChange}
          onClear={handleClear}
        />
      </header>
      {query === '' ? (
        <div className="flex grow items-center justify-center gap-2 text-xl text-neutral-n4">
          <InformationCircleIcon className="w-8 text-green-g4" />
          <span>
            Use the input above to search across Docs, Stack, and Discord.
          </span>
        </div>
      ) : (
        <main className="flex grow flex-col gap-12 p-4 xl:flex-row xl:gap-6">
          {indexes.map(({ name, title, link }) => (
            <div
              key={name}
              className="flex grow basis-0 flex-col md:max-w-lg xl:overflow-hidden"
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
      )}
      <footer className="mt-6 flex flex-col-reverse justify-between gap-4 border-t border-neutral-n10 p-6 sm:flex-row">
        <span className="text-neutral-n4">Copyright © 2023 Convex, Inc.</span>
        <div className="flex gap-4">
          <a
            href="https://github.com/get-convex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon-github-white.svg"
              alt="GitHub logo"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://convex.dev/community"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon-discord-white.svg"
              alt="Discord logo"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://twitter.com/convex_dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon-twitter-white.svg"
              alt="Twitter logo"
              width={24}
              height={24}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
