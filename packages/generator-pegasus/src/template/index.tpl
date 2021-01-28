import { createElement } from 'rax';
import { ComponentInstances } from '@vize/runtime-web-rax/src/components/ComponentInstances';
import { Router } from '@vize/runtime-web-rax/src/components/Router';
import { registryDataGetter } from '@vize/runtime-web-rax/src/utils/dataGetter';
import { setPegasusData, getPegasusData } from './pegasus';
import { sharedComponentInstances, global, meta } from '<%= globalFilePath %>';
<%= pageImports %>

const pages = <%= pages %>;

const dynamicImports = <%= dynamicImports %>;

export default function Module({ data }) {
  setPegasusData(data);
  registryDataGetter(getPegasusData);

  return (
      <Router
        pages={pages}
        dynamicPageImports={dynamicImports}
        global={global}
        meta={meta}
        sharedComponentInstances={sharedComponentInstances}
      />
  );
}
