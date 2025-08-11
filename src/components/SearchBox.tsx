import { Cross2Icon } from '@radix-ui/react-icons';
import { useEffect, useRef } from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export default function SearchBox({
  value,
  onChange,
  onClear,
}: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = () => {
    onClear();
    focusInput();
  };

  useEffect(() => {
    focusInput();
  }, []);

  return (
    <div className="relative md:grow">
      <input
        type="text"
        placeholder="Search across Docs, Stack, and Discord..."
        className="w-full bg-white rounded-sm p-2 outline-hidden md:text-lg"
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
      {value !== '' && (
        <button
          className="absolute bottom-0 right-1 top-0 flex items-center text-neutral-n8 hover:text-neutral-black"
          onClick={handleClear}
        >
          <Cross2Icon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
