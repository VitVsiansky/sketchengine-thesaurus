import * as t from './action-types';
import { INITIAL_STATE } from './constants';

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case t.STARTED_FETCHING_THESAURUS_RESULTS: {
      return Object.assign({}, state, {
        fetchingResults: true
      })
    }
    case t.COMPLETED_FETCHING_THESAURUS_RESULTS: {
      return Object.assign({}, state, {
        results: action.data,
        fetchingResults: false
      })
    }
    case t.STARTED_FETCHING_WSPOSLIST: {
      return Object.assign({}, state, {
        fetchingWSposlist: true
      })
    }
    case t.COMPLETED_FETCHING_WSPOSLIST: {
      return Object.assign({}, state, {
        fetchingWSposlist: false,
        WSposlist: action.data.WSposlist
      })
    }
    case t.DISPLAY_ADVANCED_SETTINGS: {
      return Object.assign({}, state, {
        advancedSettingsDisplayed: true
      })
    }
    case t.HIDE_ADVANCED_SETTINGS: {
      return Object.assign({}, state, {
        advancedSettingsDisplayed: false
      })
    }
    case t.RESET_ADVANCED_SETTINGS: {
      return Object.assign({}, state, {
        advancedSettings: INITIAL_STATE.advancedSettings
      })
    }
    case t.CHANGE_ADVANCED_SETTINGS: {
      return Object.assign({}, state, {
        advancedSettings: action.advancedSettings
      })
    }
    case t.PIN_ADVANCED_SETTINGS: {
      return Object.assign({}, state, {
        advancedSettingsPinned: true
      })
    }
    case t.UNPIN_ADVANCED_SETTINGS: {
      return Object.assign({}, state, {
        advancedSettingsPinned: false
      })
    }
    default: return state;
  }
};
