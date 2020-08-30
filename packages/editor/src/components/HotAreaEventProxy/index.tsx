/* eslint-disable max-lines */
import * as React from 'react';
import {
  EventInstance,
  ComponentInstance,
  HotArea,
  Maybe,
  GlobalMeta,
  WithReactChildren,
  HotAreaEventListenerTypes,
} from 'types';
import {
  emitHotArea,
  EventEmitTypes,
  events,
  getHotAreaId,
  deleteHotAreaNode,
  setHotAreaNode,
  withPersistReactEvent,
} from '../../utils';
import { ActionHandler, ActionHandlers, generateHandlers, HandlerParams } from '../ComponentEventProxy/utils';

const hotAreaIntersectionObserver = new IntersectionObserver(entries =>
  entries.forEach(({ target, isIntersecting }) => {
    const key = parseInt(target.getAttribute('data-key')!, 10);
    events.emit(EventEmitTypes.HOT_AREA_INTERSECTING_CHANGE, isIntersecting, key);
  }),
);

const LONG_PRESS_TIMEOUT = 1000;
const DOUBLE_CLICK_TIMEOUT = 200;
const INTERSECTION_TIMEOUT = 500;

interface HotAreaActionHandlerProps extends WithReactChildren {
  previewMode: boolean;
  hotArea: HotArea;
  instance: ComponentInstance;
  meta: GlobalMeta;
  global: object;
  style?: object;
}

export class HotAreaEventProxy extends React.PureComponent<HotAreaActionHandlerProps> {
  handlerParams: HandlerParams;
  handlers: {
    [key in keyof ActionHandlers]: (originalEvent: Maybe<React.SyntheticEvent>) => void;
  } = {};
  containerRef: Maybe<HTMLDivElement> = null;
  longPressTimer: Maybe<number> = null;
  preventClick = false;
  doubleClickTimer: Maybe<number> = null;
  intersectionTimer: Maybe<number> = null;
  hooksExecMap = new Map<number, boolean>();
  constructor(props: HotAreaActionHandlerProps) {
    super(props);
    this.handlerParams = { global: props.global, meta: props.meta };
    this.updateHandlersWithParams(props.previewMode ? props.hotArea.events : []);
  }

  componentDidMount(): void {
    this.observeIntersection();

    events.on(EventEmitTypes.HOT_AREA_INTERSECTING_CHANGE, this.onHotAreaIntersectionChange);
    if (this.handlers.onInit) {
      this.handlers.onInit(undefined);
    }
  }

  componentWillReceiveProps(nextProps: Readonly<HotAreaActionHandlerProps>): void {
    if (nextProps.global !== this.props.global || nextProps.meta !== this.props.meta) {
      this.updateHandlerParams(nextProps.meta, nextProps.global);
    }

    if (nextProps.hotArea.events !== this.props.hotArea.events || nextProps.previewMode !== this.props.previewMode) {
      const actions = nextProps.previewMode ? nextProps.hotArea.events : [];
      this.updateHandlersWithParams(actions);
    }
  }

  componentWillUnmount(): void {
    this.unobserveIntersection();

    events.cancel(EventEmitTypes.HOT_AREA_INTERSECTING_CHANGE, this.onHotAreaIntersectionChange);
    deleteHotAreaNode(this.props.hotArea.key);
    if (this.longPressTimer) {
      window.clearTimeout(this.longPressTimer!);
    }
  }

  observeIntersection = () => hotAreaIntersectionObserver.observe(this.containerRef!);

  unobserveIntersection = () => hotAreaIntersectionObserver.unobserve(this.containerRef!);

  onHotAreaIntersectionChange = (isIntersecting: boolean, key: number) => {
    if (key !== this.props.hotArea.key) {
      return;
    }
    if (this.intersectionTimer) {
      clearTimeout(this.intersectionTimer);
      this.intersectionTimer = null;
    }

    const callback = isIntersecting ? this.onHotAreaEnterView : this.onHotAreaLeaveView;
    this.intersectionTimer = window.setTimeout(() => {
      callback();
      clearTimeout(this.intersectionTimer!);
      this.intersectionTimer = null;
    }, INTERSECTION_TIMEOUT);
  };

  onHotAreaEnterView = () => {
    if (this.handlers.onEnterView) {
      this.handlers.onEnterView(undefined);
    }
  };

  onHotAreaLeaveView = () => {
    if (this.handlers.onLeaveView) {
      this.handlers.onLeaveView(undefined);
    }
  };

  onHotAreaPress = withPersistReactEvent((e: React.MouseEvent | React.TouchEvent) => {
    if (!this.handlers.onLongPress) {
      return;
    }

    this.longPressTimer = window.setTimeout(() => this.handlers.onLongPress!(e), LONG_PRESS_TIMEOUT);
  });

  onHotAreaPressRelease = () => {
    if (this.longPressTimer) {
      window.clearTimeout(this.longPressTimer!);
    }
    this.longPressTimer = null;
  };

  onSingleClick = withPersistReactEvent((e: React.MouseEvent) => {
    this.doubleClickTimer = window.setTimeout(() => {
      if (!this.preventClick) {
        try {
          this.handlers.onClick!(e);
        } catch (err) {
          console.error('Exec onClick action error:', err);
        }
      }
    }, DOUBLE_CLICK_TIMEOUT);
  });

  onDoubleClick = withPersistReactEvent((e: React.MouseEvent) => {
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

    setTimeout(() => (this.preventClick = false), DOUBLE_CLICK_TIMEOUT);
  });

  emitHotAreaEvent = (e: Maybe<React.SyntheticEvent>, type: HotAreaEventListenerTypes) => {
    if (!this.props.previewMode) {
      return;
    }

    const {
      props: { hotArea, instance },
      handlerParams: { global, meta },
    } = this;
    return emitHotArea(e, {
      eventType: type,
      hotArea,
      component: instance,
      meta,
      global,
    });
  };

  withEmitHotAreaEvent = (type: HotAreaEventListenerTypes, handler: Maybe<ActionHandler>) => (
    e: Maybe<React.SyntheticEvent> = undefined,
  ) => {
    if (e) {
      e.persist();
    }

    this.emitHotAreaEvent(e, type);
    if (handler) {
      return handler(e, this.handlerParams);
    }
  };

  updateHandlerParams = (meta: GlobalMeta, global: object) => {
    this.handlerParams.meta = meta;
    this.handlerParams.global = global;
  };

  updateHandlersWithParams = (actions: EventInstance[]) => {
    const {
      onInit,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onDoubleClick,
      onLongPress,
      onEnterView,
      onLeaveView,
    } = generateHandlers(actions, this.props.instance, this.props.hotArea);
    const { withEmitHotAreaEvent, handlers } = this;

    handlers.onInit = withEmitHotAreaEvent(HotAreaEventListenerTypes.INIT, onInit);
    handlers.onClick = withEmitHotAreaEvent(HotAreaEventListenerTypes.CLICK, onClick);
    handlers.onMouseEnter = withEmitHotAreaEvent(HotAreaEventListenerTypes.MOUSE_ENTER, onMouseEnter);
    handlers.onMouseLeave = withEmitHotAreaEvent(HotAreaEventListenerTypes.MOUSE_LEAVE, onMouseLeave);
    handlers.onDoubleClick = withEmitHotAreaEvent(HotAreaEventListenerTypes.DOUBLE_CLICK, onDoubleClick);
    handlers.onLongPress = withEmitHotAreaEvent(HotAreaEventListenerTypes.LONG_PRESS, onLongPress);
    handlers.onEnterView = withEmitHotAreaEvent(HotAreaEventListenerTypes.ENTER_VIEW, onEnterView);
    handlers.onLeaveView = withEmitHotAreaEvent(HotAreaEventListenerTypes.LEAVE_VIEW, onLeaveView);
  };

  setNode = (node: HTMLDivElement) => {
    this.containerRef = node;
    setHotAreaNode(this.props.hotArea.key, node);
  };

  render() {
    const { children, style } = this.props;
    const { onMouseLeave, onMouseEnter } = this.handlers;
    const id = getHotAreaId(this.props.hotArea.key);

    return (
      <div
        id={id}
        style={style}
        className="__impage-hot-area-actions-proxy"
        ref={this.setNode}
        data-key={this.props.instance.key}
        onClick={this.onSingleClick}
        onDoubleClick={this.onDoubleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={this.onHotAreaPress}
        onTouchEnd={this.onHotAreaPressRelease}
        onMouseDown={this.onHotAreaPress}
        onMouseUp={this.onHotAreaPressRelease}
      >
        {children}
      </div>
    );
  }
}
