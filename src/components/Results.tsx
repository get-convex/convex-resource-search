import { Index } from 'react-instantsearch-hooks-web';
import HitList from './HitList';
import { useState } from 'react';
import classnames from 'classnames';

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

export default function Results() {
  const [selectedIndexName, setSelectedIndexName] = useState(indexes[0].name);

  return (
    <div className="w-full">
      <div className="mb-4 flex gap-2 border-b border-neutral-n9 lg:hidden">
        {indexes.map(({ name, title }) => (
          <button
            key={name}
            className={classnames(
              'border-b-2 px-3 py-2 text-xl text-neutral-n5 transition-colors hover:text-neutral-white',
              {
                'border-transparent': name !== selectedIndexName,
                'border-neutral-n5 text-neutral-white':
                  name === selectedIndexName,
              }
            )}
            onClick={() => setSelectedIndexName(name)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {indexes.map(({ name, title, link }) => (
          <div key={name}>
            <a
              href={link}
              className="hidden bg-neutral-n12 py-4 font-display text-xl font-bold leading-none text-neutral-n2 underline-offset-4 shadow-lg stretch-max hover:underline lg:block"
              target="_blank"
            >
              {title}
            </a>
            <div
              className={classnames(
                { hidden: name !== selectedIndexName },
                'lg:block'
              )}
            >
              <Index indexName={name}>
                <HitList />
              </Index>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
