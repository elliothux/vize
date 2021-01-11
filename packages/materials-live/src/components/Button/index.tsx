import * as React from 'react';
import './index.scss';

interface Props {
  data: {
    text: string;
  };
  commonStyle: object;
  router: any;
}

export default function Button({ data: { text }, commonStyle, router }: Props) {
  return (
    <button
      className="vize-materials-universal button"
      style={commonStyle}
      onClick={() => {
        router.setCurrentPage(router.pages[0].key);
      }}
    >
      {text}
    </button>
  );
}
