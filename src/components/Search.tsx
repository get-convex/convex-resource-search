'use client';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchBox } from 'react-instantsearch';
import Results from './Results';
import SearchBox from './SearchBox';

const queryParam = 'q';

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
    if (searchParam) {
      setQuery(searchParam);
      refine(searchParam);
    }
  }, [refine]);

  return (
    <div className="flex min-h-screen flex-col gap-4">
      <header className="sticky top-0 z-10 flex h-32 flex-col justify-center gap-4 border-b border-neutral-n10 bg-neutral-n12 px-4 md:h-20 md:flex-row md:items-center md:gap-12">
        <Image src="/logo.svg" alt="Convex logo" width={320} height={36} />
        <SearchBox
          value={query}
          onChange={handleChange}
          onClear={handleClear}
        />
      </header>
      <main className="flex grow px-4">
        {query === '' ? (
          <div className="flex w-full items-center justify-center gap-2">
            <InfoCircledIcon className="w-8 h-8 shrink-0 text-green-g4" />
            <span className="text-neutral-n4 md:text-xl">
              Use the input above to search across Docs, Stack, and Discord.
            </span>
          </div>
        ) : (
          <Results />
        )}
      </main>
      <footer className="flex flex-col-reverse justify-between gap-4 border-t border-neutral-n10 px-4 py-6 sm:flex-row">
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
