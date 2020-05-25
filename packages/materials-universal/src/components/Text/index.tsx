import * as React from "react";

interface Props {
  data: {
    text: string;
  };
}

// @ts-ignore
export default function({ data: { text = "test" } }: Props) {
  return <p>{text}</p>;
}
