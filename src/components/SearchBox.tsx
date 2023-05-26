import { useState } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';

export default function SearchBox() {
  const { refine } = useSearchBox();
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    refine(value);
  };

  return (
    <input
      type="text"
      placeholder="Search across Docs, Stack, and Discord..."
      className="rounded p-2 outline-none grow lg:text-lg"
      value={query}
      onChange={handleChange}
    />
  );
}
