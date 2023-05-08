/* global instantsearch algoliasearch */

// Public API Key
const searchClient = algoliasearch(
  '1KIE511890',
  'd5802c3142d1d81cebdac1ccbb02ea9f'
);

const search = instantsearch({
  indexName: 'docs',
  searchClient,
  insights: true,
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    cssClasses: {
      form: 'Search',
      input: 'Search__input',
      submit: 'Search__submit',
    },
    autofocus: true,
    showReset: false,
  }),
  instantsearch.widgets.hits({
    container: '#hits-docs',
    cssClasses: {
      list: 'Results__list',
      item: 'ResultCard',
    },
    templates: {
      item(hit, { html, components }) {
        return html`
          <strong class="ResultCard__title">
            ${components.Highlight({ hit, attribute: 'title' })}
          </strong>
          <p>${components.Snippet({ hit, attribute: 'contents' })}</p>
        `;
      },
    },
  }),
  instantsearch.widgets.index({ indexName: 'stack' }).addWidgets([
    instantsearch.widgets.configure({
      hitsPerPage: 16,
    }),
    instantsearch.widgets.hits({
      container: '#hits-stack',
      cssClasses: {
        list: 'Results__list',
        item: 'ResultCard',
      },
      templates: {
        item(hit, { html, components }) {
          return html`
            <strong class="ResultCard__title">
              ${components.Highlight({ hit, attribute: 'title' })}
            </strong>
            <p>${components.Snippet({ hit, attribute: 'content' })}</p>
          `;
        },
      },
    }),
  ]),
  instantsearch.widgets.index({ indexName: 'discord' }).addWidgets([
    instantsearch.widgets.configure({
      hitsPerPage: 16,
    }),
    instantsearch.widgets.hits({
      container: '#hits-discord',
      cssClasses: {
        list: 'Results__list',
        item: 'ResultCard',
      },
      templates: {
        item(hit, { html, components }) {
          return html`
            <strong class="ResultCard__title">
              ${components.Highlight({ hit, attribute: 'title' })}</strong
            >
            ${hit.messages.map(
              m =>
                html`
                  <div class="DiscordMessage">
                    <div class="DiscordMessage__author">
                      <img
                        src="${m.author.avatar}"
                        class="DiscordMessage__author__avatar"
                      />
                      ${m.author.convexer &&
                        html`
                          <img
                            src="https://static.convex.dev/logo/convex-logomark-1024.png"
                            class="DiscordMessage__author__convex"
                          />
                        `}
                      ${m.author.name}
                    </div>
                    <p class="DiscordMessage__text">${m.body}</p>
                  </div>
                `
            )}
          `;
        },
      },
    }),
  ]),
]);

search.start();
