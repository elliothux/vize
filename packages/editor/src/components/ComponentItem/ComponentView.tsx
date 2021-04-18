import * as React from 'react';
import { ComponentInstance } from 'types';
import { PropsWithChildren } from 'react';
import { observer } from 'mobx-react';
import { ComponentView as RuntimeComponentView } from 'runtime';
import { editStore, globalStore, pagesStore } from 'states';

interface Props {
  instance: ComponentInstance;
}

function IComponentView({ instance, children }: PropsWithChildren<Props>) {
  const { previewMode } = editStore;
  const { metaInfo, globalData, globalStyle } = globalStore;
  const {
    router,
    currentPage: { data: pageData, style: pageStyle },
  } = pagesStore;

  return (
    <RuntimeComponentView
      instance={instance}
      previewMode={previewMode}
      router={router}
      meta={metaInfo}
      globalData={globalData}
      globalStyle={globalStyle}
      pageData={pageData}
      pageStyle={pageStyle}
    >
      {children}
    </RuntimeComponentView>
  );
}

export const ComponentView = observer(IComponentView);
