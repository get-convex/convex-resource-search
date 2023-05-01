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
  }),
  instantsearch.widgets.hits({
    container: '#hits-docs',
    cssClasses: {
      root: 'result-stack',
      list: 'result-list',
      item: 'result-item',
    },
    templates: {
      item:
        '<strong class="item-title">{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</strong><br> {{#helpers.snippet}}{ "attribute": "contents" }{{/helpers.snippet}}',
    },
  }),
  instantsearch.widgets.index({ indexName: 'stack' }).addWidgets([
    instantsearch.widgets.configure({
      hitsPerPage: 16,
    }),
    instantsearch.widgets.hits({
      container: '#hits-stack',
      cssClasses: {
        root: 'result-stack',
        list: 'result-list',
        item: 'result-item',
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
        root: 'result-stack',
        list: 'result-list',
        item: 'result-item',
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
