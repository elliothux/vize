import { configure } from "mobx";
import { pagesStore } from "./pages";

configure({
  enforceActions: "always"
});

pagesStore.init();

export * from "./components";
export * from "./global";
export * from "./materials";
export * from "./pages";
export * from "./plugins";
export * from "./select";
