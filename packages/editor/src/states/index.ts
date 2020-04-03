import { configure } from "mobx";

configure({
  enforceActions: "strict",
  reactionRequiresObservable: true,
  observableRequiresReaction: true
});

export * from "./global";
export * from "./materials";
