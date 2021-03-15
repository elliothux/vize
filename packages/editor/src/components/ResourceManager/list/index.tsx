import './index.scss';
import * as React from 'react';
import { Button, message, Pagination } from 'antd';
import { FlexPlaceholder } from 'widgets/FlexPlaceholder';
import { ResourceRecord, ResourceType } from 'sharedTypes';
import { Maybe } from 'types';
import { queryResources } from 'api';
import { EventEmitTypes, events } from 'utils';
import { throttle } from 'throttle-debounce';
import { i18n } from 'i18n';
import classNames from 'classnames';
import { ResourceItem } from './Item';

interface Props {
  visible: boolean;
  type: ResourceType;
  extension: Maybe<string>;
  setType: (v: ResourceType) => void;
  setLoading: (v: boolean) => void;
  setVisible: (v: boolean) => void;
  setExtension: (v: Maybe<string>) => void;
}

type ResourceChooseCallback = (resources: ResourceRecord[] | ResourceRecord) => void;

const PAGE_SIZE = 15;

interface State {
  resources: ResourceRecord[];
  selectedResources: ResourceRecord[];
  multiple: boolean;
  current: number;
  total: number;
}

export class ResourceList extends React.Component<Props, State> {
  state: State = {
    resources: [],
    selectedResources: [],
    multiple: false,
    current: 0,
    total: 0,
  };

  selectCallback: Maybe<ResourceChooseCallback> = null;

  componentDidMount() {
    events.only(
      EventEmitTypes.CHOOSE_RESOURCES,
      (type: ResourceType, multiple: boolean, extension: Maybe<string>, callback: ResourceChooseCallback) => {
        this.props.setVisible(true);
        this.props.setType(type);
        this.props.setExtension(extension);
        this.setState({ multiple });
        this.selectCallback = callback;
      },
    );
  }

  componentWillReceiveProps(nextProps: Readonly<Props>) {
    const { type, extension, visible } = this.props;
    if (nextProps.type !== type || nextProps.extension !== extension || nextProps.visible !== visible) {
      return this.getResources();
    }
  }

  setCurrentPage = (current: number) => this.setState({ current: current - 1 }, this.getResources);

  toggleSelect = (item: ResourceRecord) => {
    const { selectedResources, multiple } = this.state;
    const index = selectedResources.findIndex(i => i === item);
    if (index > -1) {
      selectedResources.splice(index, 1);
    } else {
      selectedResources.push(item);
    }
    this.setState({ selectedResources }, multiple ? undefined : this.onConfirm);
  };

  onConfirm = () => {
    const { resources, multiple } = this.state;
    this.selectCallback!(multiple ? resources : resources[0]);
    this.selectCallback = null;
    this.props.setVisible(false);
  };

  getResources = throttle(300, async () => {
    const { type, extension } = this.props;
    const { current } = this.state;
    this.props.setLoading(true);
    const [success, pages, response] = await queryResources(type, extension, current, PAGE_SIZE, '');
    if (success) {
      const { data: resources, total } = pages!;
      this.setState({ resources, selectedResources: [], total });
      this.props.setLoading(false);
    } else {
      message.error(`${i18n.t('Failed to get resources list')}: ${response.message}`);
    }
  });

  render() {
    const { type } = this.props;
    const { resources, selectedResources, multiple, current, total } = this.state;

    return (
      <>
        <div className="resources-items">
          {resources?.map(i => (
            <ResourceItem
              key={i.id}
              item={i}
              type={type}
              toggleSelect={this.toggleSelect}
              selected={selectedResources.includes(i)}
            />
          ))}
          {(resources?.length || 0) % 5 !== 0 ? <FlexPlaceholder /> : null}
        </div>

        <div className={classNames('resources-footer', { multiple })}>
          <Pagination
            showSizeChanger={false}
            pageSize={PAGE_SIZE}
            current={current + 1}
            total={total}
            onChange={this.setCurrentPage}
          />
          {multiple && (
            <Button type="primary" onClick={this.onConfirm}>
              确认
            </Button>
          )}
        </div>
      </>
    );
  }
}
