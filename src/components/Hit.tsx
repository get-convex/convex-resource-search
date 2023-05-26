import { Snippet } from 'react-instantsearch-hooks-web';
import { SearchHit, isDiscordHit, isDocsHit, isStackHit } from './types';

type HitProps = {
  hit: SearchHit;
};

export default function Hit({ hit }: HitProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-n12 bg-neutral-n11 p-3 shadow">
      {isDocsHit(hit) && (
        <div className="flex flex-col">
          <a
            href={hit.objectID}
            className="text-lg font-semibold text-green-g3 underline-offset-2 hover:underline"
            target="_blank"
          >
            {hit.title}
          </a>
          <Snippet hit={hit} attribute="contents" className="text-neutral-n4" />
        </div>
      )}
      {isStackHit(hit) && (
        <div className="flex flex-col">
          <a
            href={`https://stack.convex.dev/${hit.objectID}`}
            className="text-lg font-semibold text-plum-p3 underline-offset-2 hover:underline"
            target="_blank"
          >
            {hit.title}
          </a>
          <Snippet hit={hit} attribute="content" className="text-neutral-n4" />
        </div>
      )}
      {isDiscordHit(hit) && (
        <div className="flex flex-col">
          <a
            // TODO: Link to Discord thread?
            href="https://convex.dev"
            className="text-lg font-semibold text-yellow-y3 underline-offset-2 hover:underline"
            target="_blank"
          >
            {hit.title}
          </a>
          <ol>
            {hit.messages.map((message, index) => (
              <li key={index} className="text-neutral-n4">
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
