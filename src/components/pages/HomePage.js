import React, { Component } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  List,
  ListItem,
  Icon,
  NavLeft,
  NavRight,
  NavTitle,
  Link
} from "framework7-react";
import { Dialogs } from "@ionic-native/dialogs";

import Platform from "../../services/Platform";
import { name } from "../../config";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.platform = Platform;
    this.dialogs = Dialogs;
  }

  componentDidMount() {
    this.platform.registerBackButtonAction(event => {
      event.preventDefault();

      this.dialogs
        .confirm("Do you want to close the application ?", name, [
          "Close",
          "No"
        ])
        .then(index => {
          if (index === 1) {
            this.platform.exitApp();
          }
        });

      return false;
    }, 101);
  }

  render() {
    return (
      <Page>
        <Navbar>
          <NavLeft>
            <Link panelOpen="left">
              <Icon ion="ios-menu" />
            </Link>
          </NavLeft>
          <NavTitle>{name}</NavTitle>
          <NavRight>
            <Link href="/about/">
              <Icon ion="md-more" />
            </Link>
          </NavRight>
        </Navbar>
        <BlockTitle>Welcome to My App</BlockTitle>
        <Block strong>
          <p>
            Mauris posuere sit amet metus id venenatis. Ut ante dolor, tempor
            nec commodo rutrum, varius at sem. Nullam ac nisi non neque ornare
            pretium. Nulla mauris mauris, consequat et elementum sit amet,
            egestas sed orci. In hac habitasse platea dictumst.
          </p>
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
