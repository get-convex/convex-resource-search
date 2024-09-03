'use client';

import Search from '@/components/Search';
import { liteClient } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';

const searchClient = liteClient(
  '1KIE511890',
  'd5802c3142d1d81cebdac1ccbb02ea9f'
);

export default function Home() {
  return (
    <InstantSearch searchClient={searchClient}>
      <Search />
    </InstantSearch>
  );
}
