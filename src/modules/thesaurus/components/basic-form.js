import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import { displayAdvancedSettings, hideAdvancedSettings, changeAdvancedSettings, resetAdvancedSettings, pinAdvancedSettings, unpinAdvancedSettings } from '../actions';
import { getResults } from '../route-functions';
import AdvancedSettings from './advanced-settings';
import { saveAdvancedSettings } from '../../common/local-storage';
import FlashMessagesList from '../../flash-messages/components/FlashMessagesList';
import { add as addFlashMessage, deleteAll as deleteAllFlashMessages } from '../../flash-messages/actions';

class BasicForm extends React.Component {
  constructor(props) {
      super(props);

      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);

      this.state = {
        lemma: ''
      };
  }

  validateSettings() {
    const { maxthesitems, minsim, minthesscore } = this.props.advancedSettings;

    if(this.state.lemma === '') {
      this.props.addFlashMessage({
            type: 'error',
            text: 'Please input a lemma'
          });
      return false;
    }

    if(maxthesitems <= 0) {
      this.props.addFlashMessage({
            type: 'error',
            text: 'Please input a valid number of Maximum Items'
          });
      return false;
    }

    if(minsim < 0) {
      this.props.addFlashMessage({
            type: 'error',
            text: 'Please input a valid  value for Minimum Similarity in a Cluster'
          });
      return false;
    }

    if(minthesscore < 0) {
      this.props.addFlashMessage({
            type: 'error',
            text: 'Please input a valid Minimum Score'
          });
      return false;
    }

    return true;
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.deleteAllFlashMessages();

    if(this.validateSettings()) {
      getResults(this.state.lemma, this.props.advancedSettings, this.props.WSposlist);

      this.setState({
        lemma: ''
      });
    }


  }

  onChange(event) {
    if(event.target.name === 'lemma') {
      this.setState({
        lemma: event.target.value
      });
    } else if (event.target.type === 'checkbox') {
      const updatedSettings = Object.assign({}, this.props.advancedSettings, {
        [event.target.name]: event.target.checked
      });

      this.props.changeAdvancedSettings(updatedSettings);
    } else {
      const updatedSettings = Object.assign({}, this.props.advancedSettings, {
        [event.target.name]: event.target.value
      });

      this.props.changeAdvancedSettings(updatedSettings);
    }
  }

  renderAdvancedSettings() {
    return (
      <AdvancedSettings
      onChange={this.onChange}
      onSettingsDisplay={this.props.displayAdvancedSettings}
      onSettingsHide={this.props.hideAdvancedSettings}
      resetAdvancedSettings={this.props.resetAdvancedSettings}
      rememberAdvancedSettings={() => {saveAdvancedSettings(this.props.advancedSettings)}}
      pinAdvancedSettings={this.props.pinAdvancedSettings}
      unpinAdvancedSettings={this.props.unpinAdvancedSettings}
      displayed={this.props.advancedSettingsDisplayed}
      pinned={this.props.advancedSettingsPinned}
      WSposlist={this.props.WSposlist}
      minthesscore={this.props.advancedSettings.minthesscore}
      minsim={this.props.advancedSettings.minsim}
      lpos={this.props.advancedSettings.lpos}
      includeheadword={this.props.advancedSettings.includeheadword}
      clusteritems={this.props.advancedSettings.clusteritems}
      maxthesitems={this.props.advancedSettings.maxthesitems}
       />
    );
  }

  render () {
    return (
      <Form onSubmit={this.onSubmit} >
        <FlashMessagesList />
        <FormGroup>
          <Input type="text" required name="lemma" placeholder="lemma" value={this.state.lemma} onChange={this.onChange} />
        </FormGroup>
        {/*
          Advanced Settings is rendered either above the 'Submit' Button
          if it's pinned or under if it's not pinned
        */}
        {this.props.advancedSettingsPinned ? this.renderAdvancedSettings() : null}
        <FormGroup>
          <Button color="primary" type="submit">Search for Similar Words</Button>
        </FormGroup>
        {this.props.advancedSettingsPinned ? null : this.renderAdvancedSettings() }
      </Form>
    );
  }
}

BasicForm.PropTypes = {
  // Current status of the query settings
  advancedSettings: PropTypes.object.isRequired,

  // List of word types for the current corpus
  WSposlist: PropTypes.array.isRequired,

  // Current status of the settings panel
  advancedSettingsDisplayed: PropTypes.bool.isRequired,
  advancedSettingsPinned: PropTypes.bool.isRequired
}

export default connect(null, { displayAdvancedSettings, hideAdvancedSettings, changeAdvancedSettings, resetAdvancedSettings, pinAdvancedSettings, unpinAdvancedSettings, addFlashMessage, deleteAllFlashMessages })(BasicForm);
