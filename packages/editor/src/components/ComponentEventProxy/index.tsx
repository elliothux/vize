/* eslint-disable max-lines */
import * as React from 'react';
import { ComponentEventListenerTypes, ComponentInstance, Maybe, WithReactChildren } from '../../types';
import { globalStore } from '../../states';
import { observer } from 'mobx-react';
import { ActionHandler, ActionHandlers, generateHandlers, HandlerParams } from './utils';
import { events, EventEmitTypes, withPersistReactEvent } from '../../utils';

interface Props extends WithReactChildren {
  instance: ComponentInstance;
  style: object;
}

const componentIntersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    const key = parseInt(target.getAttribute('data-key')!, 10);
    events.emit(EventEmitTypes.COMPONENT_INTERSECTING_CHANGE, isIntersecting, key);
  });
});

@observer
export class ComponentEventProxy extends React.Component<Props> {
  private readonly handlerParams: HandlerParams;

  private containerRef: Maybe<HTMLDivElement> = null;

  private intersectionTimer: Maybe<number> = null;

  private longPressTimer: Maybe<number> = null;

  private doubleClickTimer: Maybe<number> = null;

  private preventClick = false;

  private handlers: {
    [key in keyof ActionHandlers]: (originalEvent: Maybe<React.SyntheticEvent>) => void;
  } = {};

  constructor(props: Props) {
    super(props);

    this.handlerParams = { global: globalStore.globalProps!, meta: globalStore.metaInfo! };
    this.updateHandlersWithParams();
  }

  public componentDidMount(): void {
    this.observeIntersection();

    events.on(EventEmitTypes.COMPONENT_INTERSECTING_CHANGE, this.onComponentIntersectionChange);

    if (this.handlers.onInit) {
      this.handlers.onInit(undefined);
    }
  }

  public componentWillUnmount(): void {
    this.unobserveIntersection();

    events.cancel(EventEmitTypes.COMPONENT_INTERSECTING_CHANGE, this.onComponentIntersectionChange);

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

  private observeIntersection = () => componentIntersectionObserver.observe(this.containerRef!);

  private unobserveIntersection = () => componentIntersectionObserver.unobserve(this.containerRef!);

  private onComponentIntersectionChange = (isIntersecting: boolean, key: number) => {
    if (key !== this.props.instance.key) {
      return;
    }

    if (this.intersectionTimer) {
      clearTimeout(this.intersectionTimer);
      this.intersectionTimer = null;
    }

    const callback = isIntersecting ? this.onComponentEnterView : this.onComponentLeaveView;
    this.intersectionTimer = window.setTimeout(() => {
      callback();
      clearTimeout(this.intersectionTimer!);
      this.intersectionTimer = null;
    }, ComponentEventProxy.INTERSECTION_TIMEOUT);
  };

  private onComponentEnterView = () => {
    if (this.handlers.onEnterView) {
      this.handlers.onEnterView(undefined);
    }
  };

  private onComponentLeaveView = () => {
    if (this.handlers.onLeaveView) {
      this.handlers.onLeaveView(undefined);
    }
  };

  private onComponentPress = withPersistReactEvent((e: React.MouseEvent | React.TouchEvent) => {
    if (!this.handlers.onLongPress) {
      return;
    }

    this.longPressTimer = window.setTimeout(
      () => this.handlers.onLongPress!(e),
      ComponentEventProxy.LONG_PRESS_TIMEOUT,
    );
  });

  private onComponentPressRelease = () => {
    if (this.longPressTimer) {
      window.clearTimeout(this.longPressTimer!);
    }
    this.longPressTimer = null;
  };

  private onSingleClick = withPersistReactEvent((e: React.MouseEvent) => {
    this.doubleClickTimer = window.setTimeout(() => {
      if (!this.preventClick) {
        try {
          this.handlers.onClick!(e);
        } catch (err) {
          console.error('Exec onClick action error:', err);
        }
      }
    }, ComponentEventProxy.DOUBLE_CLICK_TIMEOUT);
  });

  private onDoubleClick = withPersistReactEvent((e: React.MouseEvent) => {
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

    setTimeout(() => (this.preventClick = false), ComponentEventProxy.DOUBLE_CLICK_TIMEOUT);
  });

  private updateHandlersWithParams = () => {
    const {
      onInit,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onDoubleClick,
      onLongPress,
      onEnterView,
      onLeaveView,
    } = generateHandlers(this.props.instance);
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

  private withEmitComponentEvent = (type: ComponentEventListenerTypes, handler: Maybe<ActionHandler>) => (
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
    const { instance, children, style } = this.props;

    return (
      <div
        className="vize-component-event-proxy"
        ref={this.setRef}
        style={style}
        data-key={instance.key}
        onClick={this.onSingleClick}
        onDoubleClick={this.onDoubleClick}
        onMouseEnter={this.handlers.onMouseEnter}
        onMouseLeave={this.handlers.onMouseLeave}
        onTouchStart={this.onComponentPress}
        onTouchEnd={this.onComponentPressRelease}
        onMouseDown={this.onComponentPress}
        onMouseUp={this.onComponentPressRelease}
      >
        {children}
      </div>
    );
  }

  static LONG_PRESS_TIMEOUT = 1000;

  static DOUBLE_CLICK_TIMEOUT = 200;

  static INTERSECTION_TIMEOUT = 500;
}
