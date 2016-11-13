import React, { PropTypes } from 'react';
import { FormGroup, Label, Input, Col, Row, Button, Card, CardHeader, CardBlock, CardTitle, NavItem, Nav } from 'reactstrap';

class AdvancedSettings extends React.Component {
  constructor(props) {
    super(props);

    this.displayDevelopmentControls = this.displayDevelopmentControls.bind(this);
    this.hideDevelopmentControls = this.hideDevelopmentControls.bind(this);

    this.state = {
      displayedDevelopmentControls: false
    };
  }

  displayDevelopmentControls() {
    this.setState({
      displayedDevelopmentControls: true
    });
  }
  hideDevelopmentControls() {
    this.setState({
      displayedDevelopmentControls: false
    });
  }

  renderClosed() {
    return (
      <FormGroup>
        <Button type="button" onClick={this.props.onSettingsDisplay}>Settings</Button>
      </FormGroup>
    );
  }

  renderOpen() {
    return (
      <Card className="text-xs-center">
        <CardHeader>

          <Nav pills className="card-header-pills float-xs-left">
            <NavItem>
              <Button type="button" className={"nav-link " + (this.state.displayedDevelopmentControls ? '' : 'active')}
              onClick={this.hideDevelopmentControls}>Settings</Button>
          </NavItem>
            <NavItem>
              <Button type="button" className={"nav-link "  + (this.state.displayedDevelopmentControls ? 'active' : '')}
              onClick={this.displayDevelopmentControls}>Development Controls</Button>
          </NavItem>
          </Nav>

          <Nav pills className="card-header-pills float-xs-right">
          <NavItem>
            <Button type="button" onClick={this.props.resetAdvancedSettings}>Reset</Button>
          </NavItem>
          <NavItem>
            <Button type="button" onClick={this.props.rememberAdvancedSettings}>Remember</Button>
          </NavItem>
          <NavItem>
            <Button type="button" onClick={this.props.pinAdvancedSettings}>Pin</Button>
          </NavItem>
          <NavItem>
            <Button type="button" onClick={this.props.onSettingsHide}>Close</Button>
          </NavItem>
        </Nav>

        </CardHeader>

        {this.state.displayedDevelopmentControls ? (
          <CardBlock>

            <CardTitle>Development Controls</CardTitle>

            <FormGroup row>
              <Label xs={6}>Minimum Score</Label>
              <Col xs={6}>
                <Input type="number" min={0} step={0.01} name="minthesscore" value={this.props.minthesscore} onChange={this.props.onChange} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label xs={6}>Minimum Similarity in a Cluster</Label>
              <Col xs={6}>
                <Input type="number" min={0} step={0.01} name="minsim" value={this.props.minsim} onChange={this.props.onChange} />
              </Col>
            </FormGroup>

          </CardBlock>
        ) : (
          <CardBlock>

            <FormGroup row>
              <Label xs={6} for="lposselect">Part of Speech</Label>
              <Col xs={6}>
                <Input type="select" name="lpos" id="lposselect" value={this.props.lpos}  onChange={this.props.onChange}>
                  {this.props.WSposlist.map((wordType) => {
                    return (<option key={wordType.n} value={wordType.n}>{wordType.n}</option>)
                  })}
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label xs={6}>Include Headword in Word Cloud</Label>
              <Col xs={6}>
                <Input type="checkbox" name="includeheadword" checked={this.props.includeheadword} onChange={this.props.onChange} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label xs={6}>Group Words by Meaning</Label>
              <Col xs={6}>
                <Input type="checkbox" name="clusteritems" checked={this.props.clusteritems} onChange={this.props.onChange} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label xs={6}>Maximum Items</Label>
              <Col xs={6}>
                <Input type="number" min={0} name="maxthesitems" value={this.props.maxthesitems} onChange={this.props.onChange} />
              </Col>
            </FormGroup>

          </CardBlock>
        )}
      </Card>
    );
  }

  renderPinned() {
    return (
      <Card>
        <CardBlock style={{padding:10}}>
          <Row>
              <FormGroup>
                <Col xs={2}>
                  <Input type="select" name="lpos" id="lposselect" value={this.props.lpos}  onChange={this.props.onChange}>
                    {this.props.WSposlist.map((wordType) => {
                      return (<option key={wordType.n} value={wordType.n}>{wordType.n}</option>)
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={1}>
                  <Label for="includeheadword">Cloud</Label>
                </Col>
                <Col xs={1}>
                  <Input type="checkbox" name="includeheadword" id="includeheadword" checked={this.props.includeheadword} onChange={this.props.onChange} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={1}>
                  <Label for="clusteritems">Group</Label>
                </Col>
                <Col xs={1}>
                  <Input type="checkbox" name="clusteritems" id="clusteritems" checked={this.props.clusteritems} onChange={this.props.onChange} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={1}>
                  <Label for="maxthesitems">Max.</Label>
                </Col>
                <Col xs={2}>
                  <Input type="number" name="maxthesitems" id="maxthesitems" value={this.props.maxthesitems} onChange={this.props.onChange} />
                </Col>
              </FormGroup>
            <Col xs={3}>
              <Nav pills className="card-header-pills float-xs-right">
                <NavItem>
                  <Button type="button" onClick={this.props.resetAdvancedSettings}>Reset</Button>
                </NavItem>
                <NavItem>
                  <Button type="button" onClick={this.props.rememberAdvancedSettings}>Remember</Button>
                </NavItem>
                <NavItem>
                  <Button type="button" onClick={this.props.unpinAdvancedSettings}>Unpin</Button>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </CardBlock>
      </Card>
    );
  }

  render () {
    if(this.props.pinned) {
      return this.renderPinned();
    }

    if(this.props.displayed) {
      return this.renderOpen();
    } else {
      return this.renderClosed();
    }
  }
}

AdvancedSettings.PropTypes = {
  // Current status of the settings panel
  displayed: PropTypes.bool.isRequired,
  pinned: PropTypes.bool.isRequired,

  // Checks for changes in checkboxes, text and number inputs
  onChange: PropTypes.func.isRequired,

  // Handles clicks on the 'Settings' and 'Close' buttons
  // to close and display the main settings panel
  onSettingsHide: PropTypes.func.isRequired,
  onSettingsDisplay: PropTypes.func.isRequired,

  // Handles clicks on the 'Reset' button
  // to reset all settings to their default values
  resetAdvancedSettings: PropTypes.func.isRequired,

  // Handles clicks on the 'Remember' button
  // to save current settings to local storage
  rememberAdvancedSettings: PropTypes.func.isRequired,

  // Handles clicks on the 'Pin' and 'Unpin' buttons
  // to display the panel as pinned
  // Automatically saves the pinned status to local storage
  pinAdvancedSettings: PropTypes.func.isRequired,
  unpinAdvancedSettings: PropTypes.func.isRequired,

  // List of word types for the current corpus
  WSposlist: PropTypes.array.isRequired,

  // Current query settings
  minthesscore: PropTypes.number.isRequired,
  minsim: PropTypes.number.isRequired,
  lpos: PropTypes.string.isRequired,
  includeheadword: PropTypes.bool.isRequired,
  clusteritems: PropTypes.bool.isRequired,
  maxthesitems: PropTypes.number.isRequired
}

export default AdvancedSettings;
