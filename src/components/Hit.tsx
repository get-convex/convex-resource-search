import Image from 'next/image';
import { Highlight } from 'react-instantsearch';
import ImageWithFallback from './ImageWithFallback';
import Markdown from './Markdown';
import { SearchHit, isDiscordHit, isDocsHit, isStackHit } from './types';

type HitProps = {
  hit: SearchHit;
};

export default function Hit({ hit }: HitProps) {
  console.log('hit', hit);

  return (
    <div className="rounded-lg border border-neutral-n12 bg-neutral-n11 p-3 shadow-sm">
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
          <Highlight
            hit={hit}
            attribute="contents"
            className="text-neutral-n5 line-clamp-2"
          />
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
          <Highlight
            hit={hit}
            attribute="content"
            className="text-neutral-n5 line-clamp-2"
          />
        </div>
      )}
      {isDiscordHit(hit) && (
        <div className="flex flex-col">
          <a
            href={hit.url}
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
          <ol className="pt-2">
            {hit.messages.slice(0, 3).map((message, index) => (
              <li
                key={index}
                className="flex items-start gap-3 not-last-of-type:mb-2"
              >
                {/* Uses a fallback image, if the avatar we indexed is no longer available. */}
                <ImageWithFallback
                  src={message.author.avatar}
                  fallbackSrc="/discordFallback.png"
                  alt={`Profile image for ${message.author.name}`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="flex flex-col overflow-hidden">
                  <strong className="flex gap-2 text-neutral-white">
                    <span>{message.author.name}</span>
                    {message.author.convexer && (
                      <Image
                        src="/icon-convex.svg"
                        alt="Convex team member"
                        width={20}
                        height={20}
                      />
                    )}
                  </strong>
                  <Markdown text={message.body} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
