import * as React from 'react';
import { Maybe, PageMode } from 'types';
import { Checkbox } from 'antd';
import { BiOutline, BiNote } from 'react-icons/bi';
import { Trans } from 'react-i18next';
import { ItemProps } from './types';

export function PageModeSelector({ current, setCurrent, showErr }: ItemProps<Maybe<PageMode>>) {
  return (
    <div className="form-item">
      <div className="mode-items">
        <div className="mode-item">
          <Checkbox checked={current === PageMode.SINGLE} onClick={() => setCurrent(PageMode.SINGLE)}>
            <BiNote />
            <h3>
              <Trans>Single Mode</Trans>
            </h3>
            <p>
              <Trans>
                Multiple pages are rendered as a single-page application. And all pages share the one browser context
              </Trans>
            </p>
          </Checkbox>
        </div>

        <div className="mode-item">
          <Checkbox checked={current === PageMode.MULTI} onClick={() => setCurrent(PageMode.MULTI)}>
            <BiOutline />
            <h3>
              <Trans>Multiple Mode</Trans>
            </h3>
            <p>
              <Trans>
                Multiple pages are independent of each other. And each page has an independent browser context
              </Trans>
            </p>
          </Checkbox>
        </div>
      </div>

      {!current && showErr ? (
        <div className="form-item-err">
          <span>*</span> <Trans>Please select one page mode</Trans>
        </div>
      ) : null}
    </div>
  );
}
