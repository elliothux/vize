import * as Rax from 'rax';
import { createElement } from 'rax';
import {
  ComponentEventListenerTypes,
  ComponentInstance,
  EventInstance,
  GlobalMeta,
  HotArea,
  HotAreaEventListenerTypes,
  Maybe,
  PageRouter,
  WithReactChildren,
} from '@vize/types';
import {
  events,
  RuntimeEventEmitTypes,
  withPersistReactEvent,
  EventHandler,
  NodeEventHandlers,
  generateNodeEventHandlers,
  HandlerParams,
} from '../../utils';

type InstanceType = ComponentInstance | HotArea;

interface Props<T extends InstanceType> extends WithReactChildren {
  className: string;
  childrenType: 'component' | 'hotarea';
  instance: T;
  style: object;
  global: object;
  meta: GlobalMeta;
  router: PageRouter;
  previewMode: boolean;
}

const nodeIntersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    const key = parseInt(target.getAttribute('data-key')!, 10);
    const childrenType = target.getAttribute('data-children-type')!;
    events.emit(RuntimeEventEmitTypes.NODE_INTERSECTING_CHANGE, childrenType, isIntersecting, key);
  });
});

export class NodeEventProxy<T extends InstanceType> extends Rax.Component<Props<T>> {
  private readonly handlerParams: HandlerParams;

  private containerRef: Maybe<HTMLDivElement> = null;

  private intersectionTimer: Maybe<number> = null;

  private longPressTimer: Maybe<number> = null;

  private doubleClickTimer: Maybe<number> = null;

  private preventClick = false;

  private handlers: {
    [key in keyof NodeEventHandlers]: (originalEvent: Maybe<Rax.SyntheticEvent>) => void;
  } = {};

  // FIX: Stupid Rax type error
  props: any;

  constructor(props: Props<T>) {
    super(props);
    this.handlerParams = { global: props.global!, meta: props.meta! };
  }

  public componentDidMount(): void {
    this.observeIntersection();

    events.on(RuntimeEventEmitTypes.NODE_INTERSECTING_CHANGE, this.onNodeIntersectionChange);

    this.handlers.onInit?.(undefined);

    if (this.props.childrenType === 'hotarea') {
      this.updateHandlersWithParams(this.props.instance.events);
    }
  }

  public componentWillReceiveProps(nextProps: Readonly<Props<T>>) {
    if (!this.props.previewMode && nextProps.previewMode) {
      return this.updateHandlersWithParams(this.props.instance.events);
    }

    if (this.props.previewMode && !nextProps.previewMode) {
      return this.updateHandlersWithParams([]);
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

  private onNodeEnterView = () => this.handlers.onEnterView?.(undefined);

  private onNodeLeaveView = () => this.handlers.onLeaveView?.(undefined);

  private onNodePress = withPersistReactEvent((e: Rax.MouseEvent | Rax.TouchEvent) => {
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

  private onNodeSingleClick = withPersistReactEvent((e: Rax.MouseEvent) => {
    this.doubleClickTimer = window.setTimeout(() => {
      if (!this.preventClick) {
        try {
          this.handlers.onClick?.(e);
        } catch (err) {
          console.error('Exec onClick event error:', err);
        }
      }
    }, NodeEventProxy.DOUBLE_CLICK_TIMEOUT);
  });

  private onNodeDoubleClick = withPersistReactEvent((e: Rax.MouseEvent) => {
    if (this.doubleClickTimer) {
      clearTimeout(this.doubleClickTimer);
      this.doubleClickTimer = null;
    }

    this.preventClick = true;
    try {
      this.handlers.onDoubleClick?.(e);
    } catch (err) {
      console.error('Exec onClick event error:', err);
    }

    setTimeout(() => (this.preventClick = false), NodeEventProxy.DOUBLE_CLICK_TIMEOUT);
  });

  private updateHandlersWithParams = (events: EventInstance[]) => {
    const {
      onInit,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onDoubleClick,
      onLongPress,
      onEnterView,
      onLeaveView,
    } = generateNodeEventHandlers(events, this.props.instance, this.props.router);

    const { handlers, withExecNodeObserverCallbacks } = this;
    const isComponent = this.props.childrenType === 'component';
    const EventListenerTypes = isComponent ? ComponentEventListenerTypes : HotAreaEventListenerTypes;

    handlers.onInit = withExecNodeObserverCallbacks(EventListenerTypes.INIT, onInit);
    handlers.onClick = withExecNodeObserverCallbacks(EventListenerTypes.CLICK, onClick);
    handlers.onMouseEnter = withExecNodeObserverCallbacks(EventListenerTypes.MOUSE_ENTER, onMouseEnter);
    handlers.onMouseLeave = withExecNodeObserverCallbacks(EventListenerTypes.MOUSE_LEAVE, onMouseLeave);
    handlers.onDoubleClick = withExecNodeObserverCallbacks(EventListenerTypes.DOUBLE_CLICK, onDoubleClick);
    handlers.onLongPress = withExecNodeObserverCallbacks(EventListenerTypes.LONG_PRESS, onLongPress);
    handlers.onEnterView = withExecNodeObserverCallbacks(EventListenerTypes.ENTER_VIEW, onEnterView);
    handlers.onLeaveView = withExecNodeObserverCallbacks(EventListenerTypes.LEAVE_VIEW, onLeaveView);
  };

  private execNodeObserverCallbacks = (
    e: Maybe<Rax.SyntheticEvent>,
    type: ComponentEventListenerTypes | HotAreaEventListenerTypes,
  ) => {
    // TODO: exec callbacks from plugin's observer
  };

  private withExecNodeObserverCallbacks = (
    type: ComponentEventListenerTypes | HotAreaEventListenerTypes,
    handler: Maybe<EventHandler>,
  ) => {
    return (e?: Maybe<Rax.SyntheticEvent>) => {
      if (e) {
        e.persist();
      }
      this.execNodeObserverCallbacks(e, type);
      if (handler) {
        return handler(e, this.handlerParams);
      }
    };
  };

  private setRef = (node: HTMLDivElement) => (this.containerRef = node);

  public render() {
    const { instance, children, style, childrenType } = this.props;

    return (
      <div
        className={`vize-node-event-proxy ${this.props.className}`}
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
