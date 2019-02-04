import React, { Component } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  List,
  ListItem,
  Icon
} from "framework7-react";

import Platform from "../../utils/Platform";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    Platform.ready(event => {
      console.log(Platform.is("cordova"));
    });
  }

  render() {
    return (
      <Page>
        <Navbar title="Babilade" />
        <BlockTitle>Welcome to My App</BlockTitle>
        <Block strong>
          <p>
            Mauris posuere sit amet metus id venenatis. Ut ante dolor, tempor
            nec commodo rutrum, varius at sem. Nullam ac nisi non neque ornare
            pretium. Nulla mauris mauris, consequat et elementum sit amet,
            egestas sed orci. In hac habitasse platea dictumst.
          </p>
          <Icon material="home" />
          <Icon ion="ios-home" />
        </Block>
        <BlockTitle>Navigation</BlockTitle>
        <List>
          <ListItem link="/about/" title="About" />
          <ListItem link="/settings/" title="Settings" />
        </List>
      </Page>
    );
  }
}
