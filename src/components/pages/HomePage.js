import React, { Component } from 'react';
import { Page, Navbar, BlockTitle, Block, List, ListItem } from 'framework7-react';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <Navbar title="Babilade"></Navbar>
        <BlockTitle>Welcome to My App</BlockTitle>
        <Block strong>
          <p>Mauris posuere sit amet metus id venenatis. Ut ante dolor, tempor nec commodo rutrum, varius at sem. Nullam ac nisi non neque ornare pretium. Nulla mauris mauris, consequat et elementum sit amet, egestas sed orci. In hac habitasse platea dictumst.</p>
        </Block>
        <BlockTitle>Navigation</BlockTitle>
        <List>
          <ListItem link="/about/" title="About"></ListItem>
          <ListItem link="/settings/" title="Settings"></ListItem>
        </List>
      </Page>
    );
  }
}
