import * as React from "react";
import { Header } from "./components/Header";
import { SandboxRender } from "./components/SandboxRender";
import { Simulator } from "./components/Simulator";

export function App() {
  return (
    <>
      <Header />
      <Simulator>
        <SandboxRender />
      </Simulator>
    </>
  );
}
