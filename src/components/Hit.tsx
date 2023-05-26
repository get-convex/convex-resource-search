import { Snippet } from 'react-instantsearch-hooks-web';
import { SearchHit, isDiscordHit, isDocsHit, isStackHit } from './types';

type HitProps = {
  hit: SearchHit;
};

export default function Hit({ hit }: HitProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-n12 bg-neutral-n11 p-3 shadow">
      {isDocsHit(hit) && (
        <>
          <div className="text-lg font-semibold text-green-g3">{hit.title}</div>
          <Snippet hit={hit} attribute="contents" className="text-neutral-n4" />
        </>
      )}
      {isStackHit(hit) && (
        <>
          <div className="text-lg font-semibold text-plum-p3">{hit.title}</div>
          <Snippet hit={hit} attribute="content" className="text-neutral-n4" />
        </>
      )}
      {isDiscordHit(hit) && (
        <>
          <div className="text-lg font-semibold text-yellow-y3">
            {hit.title}
          </div>
          <ol>
            {hit.messages.map((message, index) => (
              <li key={index} className="text-neutral-n4">
                <strong>{message.author.name}</strong>
                <br />
                {message.body}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
