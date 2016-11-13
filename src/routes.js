import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './modules/common/app';
import ThesaurusPage from './modules/thesaurus/components/thesaurus-page';
import ThesaurusResults from './modules/thesaurus/components/thesaurus-results';

import ReadmeTemporary from './modules/common/readme-temporary';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ReadmeTemporary} />
    <Route path="thesaurus" component={ThesaurusPage}>
      <Route path=":lemma" component={ThesaurusResults} />
    </Route>
  </Route>
);
