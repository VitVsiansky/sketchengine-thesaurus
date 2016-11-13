import { combineReducers } from 'redux';

import thesaurus from './modules/thesaurus';
import flashMessages from './modules/flash-messages';

export default combineReducers({
  [thesaurus.constants.NAME]: thesaurus.reducer,
  [flashMessages.constants.NAME]: flashMessages.reducer
});
