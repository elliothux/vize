declare module "json-schema-defaults" {
  export function getDefaults(schema: string | object): object;

  export = getDefaults;
}
