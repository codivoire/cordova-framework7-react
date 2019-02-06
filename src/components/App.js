import React, { Component } from "react";
import {
  App as AppRoot,
  View,
  Statusbar,
  Panel,
  Page,
  Navbar,
  Block
} from "framework7-react";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

import Platform from "../utils/Platform";
import routes from "../routes";
import { name, version, appId } from "../config";
import SideNav from "./modals/SideNav";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.platform = Platform;
    this.screenOrientation = ScreenOrientation;
  }

  componentDidMount() {
    Platform.ready(event => {
      console.log(this.platform.is("cordova"));

      // set to portrait
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  render() {
    const f7params = {
      id: appId,
      name: name,
      version: version,
      theme: "auto",
      touch: {
        disableContextMenu: false
      }
    };

    return (
      <AppRoot params={f7params} routes={routes}>
        <Statusbar />
        <SideNav />
        <View id="main-view" url="/" main className="ios-edges" />
      </AppRoot>
    );
  }
}
