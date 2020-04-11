import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "./states";
import "./styles/index.scss";

function init(callback: Function) {
  document.addEventListener("contextmenu", e => {
    e.preventDefault();
  });

  callback();
}

init(() => render(<App />, document.getElementById("main-entry")));
