import { XMarkIcon } from '@heroicons/react/24/outline';

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
  return (
    <div className="relative md:grow">
      <input
        type="text"
        placeholder="Search across Docs, Stack, and Discord..."
        className="w-full rounded p-2 outline-none md:text-lg"
        value={value}
        onChange={onChange}
      />
      {value !== '' && (
        <button
          className="absolute bottom-0 right-1 top-0 flex items-center text-neutral-n8 hover:text-neutral-black"
          onClick={onClear}
        >
          <XMarkIcon className="w-8" />
        </button>
      )}
    </div>
  );
}
