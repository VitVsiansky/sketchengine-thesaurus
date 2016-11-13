import { browserHistory } from 'react-router';

export function getResults(lemma, advancedSettings, WSposlist) {
  let { lpos, includeheadword, clusteritems, maxthesitems, minthesscore, minsim } = advancedSettings;

  const lposIndex = WSposlist.map((wordType) => {
    return wordType.n;
  }).indexOf(lpos);
  lpos = WSposlist[lposIndex].v

  browserHistory.push(`/thesaurus/${lemma}?lpos=${lpos}&includeheadword=${includeheadword}&clusteritems=${clusteritems}&maxthesitems=${maxthesitems}&minthesscore=${minthesscore}&minsim=${minsim}`);
}

export function getResultsForOtherWordType(newlpos, lemma, advancedSettings) {
  let { includeheadword, clusteritems, maxthesitems, minthesscore, minsim } = advancedSettings;
  browserHistory.push(`/thesaurus/${lemma}?lpos=${newlpos}&includeheadword=${includeheadword}&clusteritems=${clusteritems}&maxthesitems=${maxthesitems}&minthesscore=${minthesscore}&minsim=${minsim}`);
}
