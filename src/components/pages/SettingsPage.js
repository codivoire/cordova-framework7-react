import React, { Component } from 'react';
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  List,
  ListItem
} from 'framework7-react';

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <Navbar title="Settings" backLink="Back"></Navbar>
        <Block strong>
          <p>Here is your blank Framework7 app. Let's see what we have here.</p>
        </Block>
        <BlockTitle>Navigation</BlockTitle>
        <List>
          <ListItem link="/about/" title="About"></ListItem>
        </List>
      </Page>
    );
  }
}
