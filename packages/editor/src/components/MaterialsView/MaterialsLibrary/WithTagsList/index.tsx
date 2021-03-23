import './index.scss';
import * as React from 'react';
import * as R from 'ramda';
import { MaterialsComponentMeta, MaterialsPluginMeta } from 'types';
import { FiList } from 'react-icons/fi';
import { TagItem } from './TagItem';
import { generateTagsMap, MaterialsTagsList } from './utils';
import { HeaderOptions, MaterialsViewType } from '../../HeaderOptions';

interface Props<T extends MaterialsComponentMeta & MaterialsPluginMeta> {
  view: MaterialsViewType;
  itemsMap: { [key: string]: T };
  children: (item: T) => React.ReactElement;
}

export class WithTagsList<T extends MaterialsComponentMeta & MaterialsPluginMeta> extends React.Component<Props<T>> {
  private readonly tagsList: MaterialsTagsList<MaterialsComponentMeta>;

  private readonly tagNames: string[];

  constructor(props: Props<T>) {
    super(props);

    this.tagsList = generateTagsMap(R.values(this.props.itemsMap));
    this.tagNames = this.tagsList.map(i => i.tag);
  }

  public state = {
    currentTagIndex: 0,
  };

  private onSetTag = (currentTagIndex: number) => {
    this.setState({ currentTagIndex });
  };

  private renderHeader = () => {
    return (
      <HeaderOptions type={this.props.view}>
        <FiList className="toggle-materials-view" />
      </HeaderOptions>
    );
  };

  private renderContent = () => {
    return this.tagsList[this.state.currentTagIndex].items.map(i => this.props.children(i as T));
  };

  public render() {
    return (
      <>
        <div className="vize-tags-list">
          {this.renderHeader()}
          <main>
            {this.tagNames.map((tag, index) => (
              <TagItem
                key={tag}
                name={tag}
                index={index}
                currentIndex={this.state.currentTagIndex}
                onChange={this.onSetTag}
              />
            ))}
          </main>
        </div>
        <div className="vize-materials-list">{this.renderContent()}</div>
      </>
    );
  }
}
