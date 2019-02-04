// Import React and ReactDOM
import React from "react";
import ReactDOM from "react-dom";

// Import Framework7
import Framework7 from "framework7/framework7.esm.bundle";

// Import Framework7-React plugin
import Framework7React from "framework7-react";

// Framework7 styles
import "framework7/css/framework7.min.css";

// styles
import "./styles/bundle";

// Import main App component
import App from "./components/App";

// Init Framework7-React plugin
Framework7.use(Framework7React);

// Mount React App
ReactDOM.render(React.createElement(App), document.getElementById("app"));
