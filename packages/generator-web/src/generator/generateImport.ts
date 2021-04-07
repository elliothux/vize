import { SeedItem, Seeds } from '../types';
import { varsToObject } from './utils';

interface ImportItem {
  var: string;
  import: string;
}

export function generateImportWithVars(seeds: Seeds) {
  const { componentsImports, pluginsImports, actionsImports } = generateImport(seeds);
  const imports = [
    ...componentsImports.map(i => i.import),
    ...pluginsImports.map(i => i.import),
    ...actionsImports.map(i => i.import),
  ].join(';\n');
  const [componentsVars, pluginVars, actionVars] = [componentsImports, pluginsImports, actionsImports].map(imports =>
    varsToObject(imports.map(i => i.var)),
  );
  return {
    imports,
    componentsVars,
    pluginVars,
    actionVars,
  };
}

export function generateImport({ components, plugins, actions }: Seeds) {
  const componentsImports = Object.values(components).map(generateImportItem);
  const pluginsImports = Object.values(plugins).map(generateImportItem);
  const actionsImports = Object.values(actions).map(generateImportItem);
  return {
    componentsImports,
    pluginsImports,
    actionsImports,
  };
}

function generateImportItem({ name, type, lib }: SeedItem): ImportItem {
  const [, originalName] = name.split('_');
  // console.log(name);
  // const varName = `${libName}_${originalName}`;
  return {
    var: name,
    import: `import ${name} from "libs/${lib}/src/${type}s/${originalName}"`,
  };
}
