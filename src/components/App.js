import React, { Component } from "react";
import { App as AppRoot, View, Statusbar } from "framework7-react";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import Platform from "../services/Platform";
import routes from "../routes";
import { name, version, appId } from "../config";
import SideNav from "./modals/SideNav";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.platform = Platform;
    this.screenOrientation = ScreenOrientation;
    this.statusBar = StatusBar;
    this.splashScreen = SplashScreen;

    this._exitApp = this._exitApp.bind(this);
  }

  _exitApp() {
    this.platform.exitApp();
  }

  componentDidMount() {
    this.platform.ready(event => {
      // hide splash screen
      this.splashScreen.hide();

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      // set status bar content to light
      if (window.StatusBar) {
        this.statusBar.styleLightContent();
      }

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
        <SideNav exitApp={this._exitApp} />
        <View id="main-view" url="/" main className="ios-edges" />
      </AppRoot>
    );
  }
}
