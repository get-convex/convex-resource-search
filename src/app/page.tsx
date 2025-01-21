'use client';

import Search from '@/components/Search';
import { liteClient } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';

// Search-only API key, safe to use in frontend code. See:
// https://www.algolia.com/doc/guides/security/api-keys/#search-only-api-key
const searchClient = liteClient(
  '1KIE511890',
  '07096f4c927e372785f8453f177afb16'
);

export default function Home() {
  return (
    <InstantSearch searchClient={searchClient}>
      <Search />
    </InstantSearch>
  );
}
