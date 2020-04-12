import {
  JSONSchemaDefinition,
  JsonSchemaProperties,
  PageData,
  PageInstance
} from "../types";
import { generateKey, KeyType } from "./key";
import { setPageData } from "./page";

export function createSchema(
  schema: JsonSchemaProperties
): JSONSchemaDefinition {
  return {
    type: "object",
    properties: schema
  };
}

export function createPage(
  name: string,
  isHome: boolean = false
): PageInstance {
  const key = generateKey(KeyType.Page);
  const data: PageData = {
    global: {},
    components: [],
    plugins: [],
    actions: []
  };
  setPageData(key, data);
  return {
    key,
    name,
    path: key.toString(),
    isHome,
    isNameEditing: false
  };
}
