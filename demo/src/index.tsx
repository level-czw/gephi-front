import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Root from "./views/Root";
import "./script"

ReactDOM.render(
  <React.StrictMode>
      <div id="panel">
          <button id="button">点我</button>
          <p>wdwdwd<br/><br/>dadada</p>
      </div>
    <Root />
  </React.StrictMode>,
  document.getElementById("root"),
);
