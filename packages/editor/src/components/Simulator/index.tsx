import * as React from "react";
import { WithReactChildren } from "../../types";
import { useCallback, useEffect, useRef } from "react";
import "./index.scss";
import { useMount } from "react-use";

interface Props extends WithReactChildren {}

export function Simulator({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const setClientRect = useCallback(() => {
    const { x, y } = ref.current!.getBoundingClientRect();
    [clientX, clientY] = [x, y];
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setClientRect);
    return () => window.removeEventListener("resize", setClientRect);
  }, []);

  useEffect(() => {
    if (ref.current) {
      setClientRect();
    }
  }, [ref.current]);

  return (
    <div className="vize-simulator-container" ref={ref}>
      <div className="simulator">{children}</div>
    </div>
  );
}

let [clientX, clientY] = [0, 0];

export function getSimulatorClientRect() {
  return [clientX, clientY];
}
