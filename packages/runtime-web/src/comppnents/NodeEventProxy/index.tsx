import * as React from 'react';
import {
  ComponentEventListenerTypes,
  ComponentInstance,
  EventInstance,
  HotArea,
  Maybe,
  WithReactChildren,
  GlobalMeta,
} from '../../../types';
import { RuntimeEventEmitTypes, events, withPersistReactEvent } from '../../utils';
import { EventHandler, EventHandlers, generateHandlers, HandlerParams } from './utils';

type InstanceType = ComponentInstance | HotArea;

interface Props<T extends InstanceType> extends WithReactChildren {
  childrenType: 'component' | 'hotarea';
  instance: T;
  style: object;
  global: object;
  meta: GlobalMeta;
  previewMode: boolean;
}

const nodeIntersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    const key = parseInt(target.getAttribute('data-key')!, 10);
    const childrenType = target.getAttribute('data-children-type')!;
    events.emit(RuntimeEventEmitTypes.NODE_INTERSECTING_CHANGE, childrenType, isIntersecting, key);
  });
});

export class NodeEventProxy<T extends InstanceType> extends React.Component<Props<T>> {
  private readonly handlerParams: HandlerParams;

  private containerRef: Maybe<HTMLDivElement> = null;

  private intersectionTimer: Maybe<number> = null;

  private longPressTimer: Maybe<number> = null;

  private doubleClickTimer: Maybe<number> = null;

  private preventClick = false;

  private handlers: {
    [key in keyof EventHandlers]: (originalEvent: Maybe<React.SyntheticEvent>) => void;
  } = {};

  constructor(props: Props<T>) {
    super(props);

    this.handlerParams = { global: props.global!, meta: props.meta! };
    this.updateHandlersWithParams(props.previewMode ? props.instance.events : []);
  }

  public componentDidMount(): void {
    this.observeIntersection();

    events.on(RuntimeEventEmitTypes.NODE_INTERSECTING_CHANGE, this.onNodeIntersectionChange);

    if (this.handlers.onInit) {
      this.handlers.onInit(undefined);
    }
  }

  public componentWillUnmount(): void {
    this.unobserveIntersection();

    events.cancel(RuntimeEventEmitTypes.NODE_INTERSECTING_CHANGE, this.onNodeIntersectionChange);

    if (this.longPressTimer) {
      window.clearTimeout(this.longPressTimer!);
    }
    if (this.intersectionTimer) {
      window.clearTimeout(this.intersectionTimer!);
    }
    if (this.doubleClickTimer) {
      window.clearTimeout(this.doubleClickTimer!);
    }
  }

  private observeIntersection = () => nodeIntersectionObserver.observe(this.containerRef!);

  private unobserveIntersection = () => nodeIntersectionObserver.unobserve(this.containerRef!);

  private onNodeIntersectionChange = (childrenType: Props<T>['childrenType'], isIntersecting: boolean, key: number) => {
    if (key !== this.props.instance.key || childrenType !== this.props.childrenType) {
      return;
    }

    if (this.intersectionTimer) {
      clearTimeout(this.intersectionTimer);
      this.intersectionTimer = null;
    }

    const callback = isIntersecting ? this.onNodeEnterView : this.onNodeLeaveView;
    this.intersectionTimer = window.setTimeout(() => {
      callback();
      clearTimeout(this.intersectionTimer!);
      this.intersectionTimer = null;
    }, NodeEventProxy.INTERSECTION_TIMEOUT);
  };

  private onNodeEnterView = () => {
    if (this.handlers.onEnterView) {
      this.handlers.onEnterView(undefined);
    }
  };

  private onNodeLeaveView = () => {
    if (this.handlers.onLeaveView) {
      this.handlers.onLeaveView(undefined);
    }
  };

  private onNodePress = withPersistReactEvent((e: React.MouseEvent | React.TouchEvent) => {
    if (!this.handlers.onLongPress) {
      return;
    }

    this.longPressTimer = window.setTimeout(() => this.handlers.onLongPress!(e), NodeEventProxy.LONG_PRESS_TIMEOUT);
  });

  private onNodePressRelease = () => {
    if (this.longPressTimer) {
      window.clearTimeout(this.longPressTimer!);
    }
    this.longPressTimer = null;
  };

  private onNodeSingleClick = withPersistReactEvent((e: React.MouseEvent) => {
    this.doubleClickTimer = window.setTimeout(() => {
      if (!this.preventClick) {
        try {
          this.handlers.onClick!(e);
        } catch (err) {
          console.error('Exec onClick action error:', err);
        }
      }
    }, NodeEventProxy.DOUBLE_CLICK_TIMEOUT);
  });

  private onNodeDoubleClick = withPersistReactEvent((e: React.MouseEvent) => {
    if (this.doubleClickTimer) {
      clearTimeout(this.doubleClickTimer);
      this.doubleClickTimer = null;
    }

    this.preventClick = true;
    try {
      this.handlers.onDoubleClick!(e);
    } catch (err) {
      console.error('Exec onClick action error:', err);
    }

    setTimeout(() => (this.preventClick = false), NodeEventProxy.DOUBLE_CLICK_TIMEOUT);
  });

  private updateHandlersWithParams = (actions: EventInstance[]) => {
    const {
      onInit,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onDoubleClick,
      onLongPress,
      onEnterView,
      onLeaveView,
    } = generateHandlers(actions, this.props.instance);
    const { handlers, withEmitComponentEvent } = this;

    handlers.onInit = withEmitComponentEvent(ComponentEventListenerTypes.INIT, onInit);
    handlers.onClick = withEmitComponentEvent(ComponentEventListenerTypes.CLICK, onClick);
    handlers.onMouseEnter = withEmitComponentEvent(ComponentEventListenerTypes.MOUSE_ENTER, onMouseEnter);
    handlers.onMouseLeave = withEmitComponentEvent(ComponentEventListenerTypes.MOUSE_LEAVE, onMouseLeave);
    handlers.onDoubleClick = withEmitComponentEvent(ComponentEventListenerTypes.DOUBLE_CLICK, onDoubleClick);
    handlers.onLongPress = withEmitComponentEvent(ComponentEventListenerTypes.LONG_PRESS, onLongPress);
    handlers.onEnterView = withEmitComponentEvent(ComponentEventListenerTypes.ENTER_VIEW, onEnterView);
    handlers.onLeaveView = withEmitComponentEvent(ComponentEventListenerTypes.LEAVE_VIEW, onLeaveView);
  };

  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private emitComponentEvent = (e: Maybe<React.SyntheticEvent>, type: ComponentEventListenerTypes) => {
    // const {
    //     props: { instance },
    //     handlerParams: { global, meta },
    // } = this;
    // return emitComponent(e, type, instance, meta, global);
  };

  private withEmitComponentEvent = (type: ComponentEventListenerTypes, handler: Maybe<EventHandler>) => (
    e: Maybe<React.SyntheticEvent> = undefined,
  ) => {
    if (e) {
      e.persist();
    }

    this.emitComponentEvent(e, type);
    if (handler) {
      return handler(e, this.handlerParams);
    }
  };

  private setRef = (node: HTMLDivElement) => {
    this.containerRef = node;
  };

  public render() {
    const { instance, children, style, childrenType } = this.props;

    return (
      <div
        className="vize-component-event-proxy"
        ref={this.setRef}
        style={style}
        data-key={instance.key}
        data-children-type={childrenType}
        onClick={this.onNodeSingleClick}
        onDoubleClick={this.onNodeDoubleClick}
        onTouchStart={this.onNodePress}
        onTouchEnd={this.onNodePressRelease}
        onMouseDown={this.onNodePress}
        onMouseUp={this.onNodePressRelease}
        onMouseEnter={this.handlers.onMouseEnter}
        onMouseLeave={this.handlers.onMouseLeave}
      >
        {children}
      </div>
    );
  }

  static LONG_PRESS_TIMEOUT = 1000;

  static DOUBLE_CLICK_TIMEOUT = 200;

  static INTERSECTION_TIMEOUT = 500;
}
