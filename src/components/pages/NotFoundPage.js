import React, { Component } from 'react';
import { Page, Navbar, Block } from 'framework7-react';

export default class NotFoundPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <Navbar title="Not found" backLink="Back" />
        <Block strong>
          <p>Sorry</p>
          <p>Requested content not found.</p>
        </Block>
      </Page>
    );
  }
}
