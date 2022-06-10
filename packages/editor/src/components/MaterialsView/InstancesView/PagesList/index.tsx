import './index.scss';
import * as React from 'react';
import { observer } from 'mobx-react';
import { FiPlus } from 'react-icons/fi';
import { pagesStore } from 'states';
import { Tooltip } from 'antd';
import { i18n } from '@vize/i18n';
import { PageItem } from './PageItem';
import { HeaderOptions, MaterialsViewType } from '../../HeaderOptions';

@observer
export class PagesList extends React.Component {
  private addPage = () => {
    pagesStore.addPage(true, false);
  };

  private renderHeader = () => {
    return (
      <HeaderOptions type={MaterialsViewType.INSTANCES}>
        <Tooltip title={i18n.t('new page')} placement="right">
          <FiPlus className="add-page" onClick={this.addPage} />
        </Tooltip>
      </HeaderOptions>
    );
  };

  public render() {
    const { pages } = pagesStore;

    return (
      <div className="vize-pages-list">
        {this.renderHeader()}
        <main>
          {pages.map((page, index) => (
            <PageItem key={page.key.toString()} instance={page} index={index} />
          ))}
        </main>
      </div>
    );
  }
}
