import React, { Component } from "react";
import { Page, View, Panel, Block, BlockTitle } from "framework7-react";

export default class SideNav extends Component {
  render() {
    return (
      <Panel left cover>
        <View>
          <Page>
            <BlockTitle>Left Panel</BlockTitle>
            <Block strong>
              <p>Left panel content goes here</p>
            </Block>
          </Page>
        </View>
      </Panel>
    );
  }
}
