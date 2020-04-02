import * as React from "react";
import { Header } from "./components/Header";
import { SandboxRender } from "./components/SandboxRender";
import { Simulator } from "./components/Simulator";

export function App() {
  return (
    <>
      <Header />
      <Simulator>
        <SandboxRender mountTarget="#vize-main-entry">
          {doc => {
            console.log(doc);
            return <h1>hello</h1>;
          }}
        </SandboxRender>
      </Simulator>
    </>
  );
}
