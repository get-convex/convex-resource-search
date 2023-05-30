import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';

const queryParam = 'q';

export default function SearchBox() {
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
