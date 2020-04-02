import { parseUrl } from "query-string";
import { Maybe } from "../types";

export const noop = () => {};

interface QueryParams {
  lib: string;
  debugPort: Maybe<number>;
}

export function getQueryParams(): QueryParams {
  const {
    query: { lib, debugPort }
  } = parseUrl(window.location.href);
  return {
    lib: lib as string,
    debugPort: debugPort ? parseInt(debugPort as string, 10) : null
  };
}
