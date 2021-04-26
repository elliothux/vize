import * as React from 'react';
import { MaterialsManifest } from 'types';
import { message, Modal } from 'antd';
import { goToPlayground } from 'utils';
import { BiRightArrowAlt } from 'react-icons/bi';
import { i18n } from 'i18n';

export function goToPlaygroundWithContainers(libName: string, containers: MaterialsManifest['containers']) {
  const names = Object.keys(containers);

  if (names.length === 0) {
    return message.warn(i18n.t('no containers'));
  }

  if (names.length === 1) {
    return goToPlayground(libName, names[0]);
  }

  const modal = Modal.info({
    title: i18n.t('Choose container'),
    content: (
      <div className="container-selector">
        {Object.entries(containers).map(([container, { info: { name, desc, author } }]) => (
          <div
            key={container}
            className="container-selector-item"
            onClick={() => {
              goToPlayground(libName, container);
              modal.destroy();
            }}
          >
            <h3>{name}</h3>
            <p className="desc">{desc}</p>
            <p className="author">
              {i18n.t('Developer')}: {author}
            </p>
            <BiRightArrowAlt />
          </div>
        ))}
      </div>
    ),
    className: 'container-selector-modal',
    okText: i18n.t('Cancel'),
  });
}
