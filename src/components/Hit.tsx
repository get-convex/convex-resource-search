import { Snippet } from 'react-instantsearch-hooks-web';
import { SearchHit, isDiscordHit, isDocsHit, isStackHit } from './types';

type HitProps = {
  hit: SearchHit;
};

export default function Hit({ hit }: HitProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-neutral-n2 p-3 shadow">
      <div className="text-md font-bold">{hit.title}</div>
      {isDocsHit(hit) && (
        <div>
          <Snippet hit={hit} attribute="contents" />
        </div>
      )}
      {isStackHit(hit) && (
        <div>
          <Snippet hit={hit} attribute="content" />
        </div>
      )}
      {isDiscordHit(hit) && (
        <ol>
          {hit.messages.map((message, index) => (
            <li key={index}>
              <strong>{message.author.name}</strong>
              <br />
              {message.body}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
