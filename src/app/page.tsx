'use client';

import Search from '@/components/Search';
import { algoliasearch } from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch';

const searchClient = algoliasearch(
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
