import { Snippet } from 'react-instantsearch-hooks-web';
import { SearchHit, isDiscordHit, isDocsHit, isStackHit } from './types';
import Image from 'next/image';

type HitProps = {
  hit: SearchHit;
};

export default function Hit({ hit }: HitProps) {
  if (isDiscordHit(hit)) {
    console.log({ hit });
  }

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-n12 bg-neutral-n11 p-3 shadow">
      {isDocsHit(hit) && (
        <div className="flex flex-col">
          <a
            href={hit.objectID}
            className="mb-2 flex items-start gap-2 text-lg font-semibold leading-tight text-yellow-y3 underline-offset-2 hover:underline"
            target="_blank"
          >
            <Image
              src="/icon-convex.svg"
              alt="Convex logo"
              width={20}
              height={20}
            />
            {hit.title}
          </a>
          <Snippet hit={hit} attribute="contents" className="text-neutral-n5" />
        </div>
      )}
      {isStackHit(hit) && (
        <div className="flex flex-col">
          <a
            href={`https://stack.convex.dev/${hit.objectID}`}
            className="mb-2 flex items-start gap-2 text-lg font-semibold leading-tight text-neutral-white underline-offset-2 hover:underline"
            target="_blank"
          >
            <Image
              src="/icon-stack.svg"
              alt="Stack logo"
              width={20}
              height={20}
            />
            {hit.title}
          </a>
          <Snippet hit={hit} attribute="content" className="text-neutral-n5" />
        </div>
      )}
      {isDiscordHit(hit) && (
        <div className="flex flex-col">
          <a
            // TODO: Link directly to Discord thread?
            href="https://discord.com/invite/nk6C2qTeCq"
            className="mb-2 flex items-start gap-2 text-lg font-semibold leading-tight text-discord underline-offset-2 hover:underline"
            target="_blank"
          >
            <Image
              src="/icon-discord.svg"
              alt="Discord logo"
              width={20}
              height={20}
            />
            {hit.title}
          </a>
          <ol>
            {hit.messages.map((message, index) => (
              <li key={index} className="text-neutral-n5">
                <strong>{message.author.name}</strong>
                <br />
                {message.body}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
