export const NAME = 'thesaurus';

export const INITIAL_STATE = {
  fetchingResults: true,
  fetchingWSposlist: true,
  advancedSettings: {
    minthesscore: 0,
    minsim: 0.15,
    lpos: 'noun',
    includeheadword: false,
    clusteritems: false,
    maxthesitems: 60
  },
  advancedSettingsDisplayed: false,
  advancedSettingsPinned: false,
  WSposlist: []
}
