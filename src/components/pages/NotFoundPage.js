import React, { Component } from "react";
import { Page, Navbar, Block } from "framework7-react";

import RegisterBackButtonAction from "../../services/RegisterBackButtonAction";

export default class NotFoundPage extends Component {
  constructor(props) {
    super(props);

    this.platform = Platform;
  }

  componentDidMount() {
    // handle back button
    RegisterBackButtonAction(this.$f7router);
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
