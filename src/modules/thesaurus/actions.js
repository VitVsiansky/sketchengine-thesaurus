import axios from 'axios';

import * as t from './action-types';
import { thesaurusQuerySkeleton, WSPoslistQuery } from '../common/api';
import { rememberAdvancedSettingsPinned } from '../common/local-storage';

export function fetchThesaurusResults(params) {
  const { lemma, lpos, includeheadword, clusteritems, maxthesitems, minthesscore, minsim } = params;

  let binaryIncludeheadword = includeheadword === 'true' ? 1 : 0;
  let binaryClusteritems = clusteritems === 'true' ? 1 : 0;

  const thesaurusQuery = `${thesaurusQuerySkeleton}lemma=${lemma.toLowerCase()}&lpos=${lpos}&maxthesitems=${maxthesitems}&minthesscore=${minthesscore}&includeheadword=${binaryIncludeheadword}&clusteritems=${binaryClusteritems}&minsim=${minsim}`;

  return function(dispatch) {
    dispatch({ type: t.STARTED_FETCHING_THESAURUS_RESULTS });
     axios.get(thesaurusQuery)
       .then((response) => {
         dispatch({ type: t.COMPLETED_FETCHING_THESAURUS_RESULTS, data: response.data })
       })
       .catch((err) => {
         console.log(err);
       })
   }
}

export function fetchWSposlist() {

  return function(dispatch) {
    dispatch({ type: t.STARTED_FETCHING_WSPOSLIST });
    axios.get(WSPoslistQuery)
      .then((response) => {
        dispatch({ type: t.COMPLETED_FETCHING_WSPOSLIST, data: response.data })
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function displayAdvancedSettings() {
  return {
    type: t.DISPLAY_ADVANCED_SETTINGS
  };
}

export function hideAdvancedSettings() {
  return {
    type: t.HIDE_ADVANCED_SETTINGS
  };
}

export function resetAdvancedSettings() {
  return {
    type: t.RESET_ADVANCED_SETTINGS
  };
}

export function changeLemma(lemma) {
  return {
    type: t.CHANGE_LEMMA,
    lemma: lemma
  }
}

export function changeAdvancedSettings(advancedSettings) {
  return {
    type: t.CHANGE_ADVANCED_SETTINGS,
    advancedSettings: advancedSettings
  }
}

export function pinAdvancedSettings() {
  rememberAdvancedSettingsPinned(true);
  return {
    type: t.PIN_ADVANCED_SETTINGS
  }
}

export function unpinAdvancedSettings() {
  rememberAdvancedSettingsPinned(false);
  return {
    type: t.UNPIN_ADVANCED_SETTINGS
  }
}
