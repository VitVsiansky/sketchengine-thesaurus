import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, CardBlock, CardTitle, CardSubtitle, Table, Col } from 'reactstrap';
import WordCloud from 'wordcloud';
import ReactDOM from 'react-dom';

import { fetchThesaurusResults } from '../actions';
import { getResultsForOtherWordType } from '../route-functions';
import { add as addFlashMessage, deleteAll as deleteAllFlashMessages } from '../../flash-messages/actions';

class ThesaurusResults extends React.Component {
  componentWillReceiveProps(props) {
    if((_.isEqual(this.props.params, props.params) === false ) || (_.isEqual(this.props.location.query, props.location.query) === false )) {
      this.fetchResults(props.params.lemma, props.location.query);
    }
  }


  componentDidUpdate() {
    if(this.props.results) {
      if(!this.props.results.error) {
          this.renderWordCloud();
      } else {
        this.props.deleteAllFlashMessages();
        this.props.addFlashMessage({
          type: 'error',
          text: this.props.results.error
        });
      }
  }
}

  componentDidMount() {
    this.fetchResults();

  }

  fetchResults(lemma, settings) {
    const { lpos, includeheadword, clusteritems, maxthesitems, minthesscore, minsim } = settings || this.props.location.query;

    this.props.fetchThesaurusResults({
      lemma: lemma || this.props.params.lemma,
      lpos, includeheadword, clusteritems, maxthesitems, minthesscore, minsim
    })
  }

  fetchOtherWordType(wordType) {
    getResultsForOtherWordType(wordType, this.props.params.lemma, this.props.location.query)
  }

  isCluster() {
    console.log('checking');
    console.log(this.props.results.Words);
    if(this.props.results.Words.map((word) => {
      if(word.Clust) {
        return true;
      } else {
        return false;
      }
    }).indexOf(true) !== -1 ) {
      return true;
    } else {
      return false;
    }
  }

  renderLoading() {
    return (
      <div>
        Loading
      </div>
    );
  }

  renderOtherWordTypes() {
    const wspos_dictProperties = Object.getOwnPropertyNames(this.props.results.wspos_dict);

    const indexToRemove = wspos_dictProperties.map((wordType) => {
      return wordType;
    }).indexOf(this.props.results.lpos);

    const wordTypesWithoutCurrent = [
    ...wspos_dictProperties.slice(0, indexToRemove),
    ...wspos_dictProperties.slice(indexToRemove + 1)
    ];
    console.log(wordTypesWithoutCurrent);
    return wordTypesWithoutCurrent.map((wordType) => {
      return (
        <a key={wordType} href="#" onClick={() => this.fetchOtherWordType(wordType)}>{this.props.results.wspos_dict[wordType]} </a>
      );
    })
  }

  renderWordCloud() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    const list = this.props.results.Words.map((word) => {
      return [
        word.word,
        Math.pow(word.score*5, 6)
      ]
    });

    if(this.props.location.query.includeheadword === 'true') {
      console.log('rendering including wordcloud')
      list.push([this.props.results.lemma, Math.pow(this.props.results.Words[0].score*5, 6)])
    }

    WordCloud(canvas, { list: list, minSize: 10});
  }

  renderTableWithoutCluster() {
    return (
      <Table size="sm" striped>
        <thead>
          <tr>
            <th>Lemma</th>
            <th>Score</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {this.props.results.Words ? this.props.results.Words.map(word => {
            return (
              <tr key={word.id}>
                  <td>{word.word}</td>
                  <td>{word.score}</td>
                  <td>{word.freq}</td>
              </tr>);
          }) : null}
        </tbody>
      </Table>
    );
  }

  renderTableWithCluster() {
    return (
      <Table size="sm" striped>
        <thead>
          <tr>
            <th>Lemma</th>
            <th>Score</th>
            <th>Frequency</th>
            <th>Cluster</th>
          </tr>
        </thead>
        <tbody>
          {this.props.results.Words ? this.props.results.Words.map(word => {
            return (
              <tr key={word.id}>
                  <td>{word.word}</td>
                  <td>{word.score}</td>
                  <td>{word.freq}</td>
                  <td>{ word.Clust ? word.Clust.map((word) => {
                      return (
                        <span key={word.word}>{word.word} [{word.score} · {word.freq}] </span>
                      );
                    }) : <span />} </td>
              </tr>);
          }) : null}
        </tbody>
      </Table>
    );
  }

  renderResults() {
    return (
      <Card>
        <CardBlock>
          <CardTitle>{this.props.results.lemma}</CardTitle>
          <CardSubtitle style={{marginTop:10}}>
            <Col xs={6}>
            {this.props.results.wspos_dict[this.props.results.lpos]} · {this.props.results.freq} hits  · {Math.round(1000*this.props.results.relfreq)/1000} per million
            <br />
              {this.renderOtherWordTypes()}
            </Col>
            <Col xs={6}>
                          <canvas ref="canvas"></canvas>
            </Col>
          </CardSubtitle>
        </CardBlock>
        <CardBlock>
          {this.isCluster() ? this.renderTableWithCluster() : this.renderTableWithoutCluster()}
        </CardBlock>
      </Card>
    );
  }


  render () {
    if(this.props.fetchingResults) {
      return this.renderLoading();
    }
    if(this.props.results.error) {
      return (
        <div></div>);
    }

    return this.renderResults();
  }
}

ThesaurusResults.propTypes = {
  fetchingResults: PropTypes.bool.isRequired,
  results: PropTypes.object
};

function mapStateToProps(state) {
    if (!state.thesaurus.fetchingResults) {
        return {
            results: state.thesaurus.results,
            fetchingResults: state.thesaurus.fetchingResults
        }
    } else {
        return {
            fetchingResults: state.thesaurus.fetchingResults
        }
    }
}

export default connect(mapStateToProps, { fetchThesaurusResults, addFlashMessage, deleteAllFlashMessages })(ThesaurusResults);
