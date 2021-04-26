import * as React from 'react';
import { LayoutMode, Maybe } from 'types';
import { Checkbox } from 'antd';
import { BiWater, BiSelection } from 'react-icons/bi';
import { Trans } from 'react-i18next';
import { unImplemented } from 'utils';
import { ItemProps } from './types';

export function LayoutModeSelector({ current, setCurrent, showErr }: ItemProps<Maybe<LayoutMode>>) {
  return (
    <div className="form-item">
      <div className="mode-items">
        <div className="mode-item">
          <Checkbox checked={current === LayoutMode.STREAM} onClick={() => setCurrent(LayoutMode.STREAM)}>
            <BiWater />
            <h3>
              <Trans>Stream Layout</Trans>
            </h3>
            <p>
              <Trans>All components are arranged from top to bottom. And their size is adaptive</Trans>
            </p>
          </Checkbox>
        </div>

        <div className="mode-item">
          <Checkbox checked={current === LayoutMode.FREE} onClick={unImplemented}>
            <BiSelection />
            <h3>
              <Trans>Free Layout</Trans>
            </h3>
            <p>
              <Trans>
                All components are freely dragged to arrange. And the size is scaled according to the screen width
              </Trans>
            </p>
          </Checkbox>
        </div>
      </div>

      {!current && showErr ? (
        <div className="form-item-err">
          <span>*</span> <Trans>Please select one layout mode</Trans>
        </div>
      ) : null}
    </div>
  );
}
