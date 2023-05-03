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
      item:
        '<strong class="ResultCard__title">{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</strong><br> {{#helpers.snippet}}{ "attribute": "contents" }{{/helpers.snippet}}',
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
        item:
          '<strong class="item-title">{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</strong><br> {{#helpers.snippet}}{ "attribute": "content" }{{/helpers.snippet}}',
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
          console.log(hit);
          return html`
            <strong class="item-title">
              ${components.Highlight({ hit, attribute: 'title' })}</strong
            ><br />
            ${hit.messages.map(
              m =>
                html`
                  <p>
                    <img src="${m.author.avatar}" class="avatar" />
                    <strong class="author-block">
                      ${m.author.name}
                      ${m.author.convexer &&
                        html`
                          <img
                            src="https://static.convex.dev/logo/convex-logomark-1024.png"
                            class="convex-logo"
                          />
                        `}
                      :
                    </strong>
                    ${m.body}
                  </p>
                `
            )}
          `;
          // {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</strong><br> {{#helpers.highlight}}{ "attribute": "messages" }{{/helpers.highlight}}',
        },
      },
    }),
  ]),
]);

search.start();
