import React from "react";
import { App, View, Statusbar } from "framework7-react";

import { name, appId } from "../config";
import routes from "../routes";

export default function(props) {
  // Framework7 parameters here
  const f7params = {
    id: appId,
    name: name,
    theme: "auto",
    routes
  };

  return (
    <App params={f7params}>
      <Statusbar />
      <View id="main-view" url="/" main className="ios-edges" />
    </App>
  );
}
