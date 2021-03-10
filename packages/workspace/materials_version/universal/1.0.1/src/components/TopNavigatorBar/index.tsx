import * as React from 'react';
import './index.scss';

interface Props {
  data: {
    items: string[];
  };
  commonStyle: object;
  router: any;
}

export default function Button({ commonStyle, router: { pages, setCurrentPage, currentPage } }: Props) {
  return (
    <div className="vize-materials-universal top-navigator-bar" style={commonStyle}>
      {pages.map(({ name, key }, index) => (
        <div
          key={key}
          className={key === currentPage ? 'selected' : ''}
          onClick={() => setCurrentPage(pages[index].key)}
        >
          {name}
        </div>
      ))}
    </div>
  );
}
