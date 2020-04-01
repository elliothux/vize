import * as React from "react";
import "./index.scss";

interface Props {
  data: {
    text: string;
  };
}

// @ts-ignore
export default function({ data: { text } }: Props) {
  return <button>{text}</button>;
}
