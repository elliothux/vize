import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "./styles/index.scss";

function init() {
  return render(<App />, document.getElementById("main-entry"));
}

init();
