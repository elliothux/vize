import { configure } from "mobx";
import { pagesStore } from "./pages";
import { materialsStore } from "./materials";

configure({
  enforceActions: "always"
});

export async function initStore() {
  pagesStore.init();
  await materialsStore.init();
}

export * from "./components";
export * from "./global";
export * from "./materials";
export * from "./pages";
export * from "./plugins";
export * from "./select";
