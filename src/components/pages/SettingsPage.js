import React, { Component } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Button
} from 'framework7-react';

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <Navbar>
          <NavLeft>
            <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"></Link>
          </NavLeft>
          <NavTitle>Paramètres</NavTitle>
          <NavRight>
            <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right"></Link>
          </NavRight>
        </Navbar>
        <Toolbar>
          <Link>Left Link</Link>
          <Link>Right Link</Link>
        </Toolbar>
        <Block strong>
          <p>Here is your blank Framework7 app. Let's see what we have here.</p>
        </Block>
        <BlockTitle>Navigation</BlockTitle>
        <List>
          <ListItem link="/about/" title="About"></ListItem>
          <ListItem link="/load-something-that-doesnt-exist/" title="Default Route (404)"></ListItem>
        </List>
        <BlockTitle>Modals</BlockTitle>
        <Block strong>
          <Button fill raised popupOpen="#popup">Popup</Button>
        </Block>
      </Page>
    );
  }
}
