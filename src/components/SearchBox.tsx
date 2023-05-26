import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSearchBox } from 'react-instantsearch-hooks-web';

export default function SearchBox() {
  const { refine } = useSearchBox();
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    refine(value);
  };

  const handleClear = () => {
    setQuery('');
    refine('');
  };

  return (
    <div className="relative md:grow">
      <input
        type="text"
        placeholder="Search across Docs, Stack, and Discord..."
        className="w-full rounded p-2 outline-none md:text-lg"
        value={query}
        onChange={handleChange}
      />
      {query !== '' && (
        <button
          className="absolute bottom-0 right-1 top-0 flex items-center text-neutral-n8 hover:text-neutral-black"
          onClick={handleClear}
        >
          <XMarkIcon className="w-8" />
        </button>
      )}
    </div>
  );
}
