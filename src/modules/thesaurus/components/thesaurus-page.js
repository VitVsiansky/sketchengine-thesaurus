import React from 'react';
import { connect } from 'react-redux';
import { Container} from 'reactstrap';

import BasicForm from './basic-form';
import { fetchWSposlist } from '../actions';

class ThesaurusPage extends React.Component {
  componentDidMount() {
    this.props.fetchWSposlist();
  }

  render () {
    if(this.props.thesaurus.fetchingWSposlist === undefined || this.props.thesaurus.fetchingWSposlist) {
      return (
        <div>
          Fetching WSposlist
        </div>
      );
    }

    return (
      <Container>
        <h2>Thesaurus</h2>
        <BasicForm
        advancedSettings={this.props.thesaurus.advancedSettings}
        advancedSettingsDisplayed={this.props.thesaurus.advancedSettingsDisplayed}
        advancedSettingsPinned={this.props.thesaurus.advancedSettingsPinned}
        WSposlist={this.props.thesaurus.WSposlist}/>
        {this.props.children}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { thesaurus: state.thesaurus }
}

export default connect(mapStateToProps, { fetchWSposlist })(ThesaurusPage);
