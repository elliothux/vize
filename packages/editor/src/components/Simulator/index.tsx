import * as React from "react";
import { WithReactChildren } from "../../types";
import "./index.scss";

interface Props extends WithReactChildren {}

export function Simulator({ children }: Props) {
  return <div className="simulator-container">
    <div className="simulator">{children}</div>
  </div>;
}
