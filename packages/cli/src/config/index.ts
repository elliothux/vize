import * as fs from "fs";
import { MaterialsLibConfig } from "../types";
import { LibPaths } from "../utils";

export function getLibConfig({
  config: configPath
}: LibPaths): MaterialsLibConfig {
  if (!fs.existsSync(configPath)) {
    throw "no config";
  }

  const { libName } = JSON.parse(
    fs.readFileSync(configPath, "utf-8")
  ) as Partial<MaterialsLibConfig>;

  return { libName: libName! };
}
