export function loadState () {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined;
  }
}

import {INITIAL_STATE as thesaurusInitialState } from '../thesaurus/constants';

const INITIAL_STATE = {
  thesaurus: thesaurusInitialState
}

function getStateFromStorage() {
  try {
    let stateInStorage = localStorage.getItem('state');
    if (stateInStorage === null) {
      stateInStorage = INITIAL_STATE;
    } else {
      stateInStorage = JSON.parse(stateInStorage)
    }
    const state = Object.assign({}, stateInStorage);
    return state;
  } catch (err) {
    console.log(err);
  }
}

export function rememberAdvancedSettingsPinned(isPinned) {
  try {
    let newState = getStateFromStorage();
    newState.thesaurus.advancedSettingsPinned = isPinned;

    localStorage.setItem('state', JSON.stringify(newState));
  } catch (err) {
    console.log(err);
  }
}

export function saveAdvancedSettings(advancedSettings) {
  try {
    let newState = getStateFromStorage();
    newState.thesaurus.advancedSettings = advancedSettings;

    localStorage.setItem('state', JSON.stringify(newState));
  } catch (err) {
    console.log(err);
  }
}
