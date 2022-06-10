import './index.scss';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { ComponentInstance, Maybe } from '@vize/types';
import { noop } from 'utils';

interface Props {
  htmlContent: string;
  mountTarget: string;
  children: (
    doc: Document,
    win: Window,
    mountTarget: HTMLDivElement,
    componentInstance: ComponentInstance[],
    sharedComponentInstances: ComponentInstance[],
  ) => React.ReactNode;
  componentInstances: ComponentInstance[];
  sharedComponentInstances: ComponentInstance[];
  iframeDidMount?: (doc: Document, win: Window) => void;
}

export class RenderSandbox extends React.Component<Props> {
  static defaultProps = {
    iframeDidMount: noop,
  };

  public state = {
    loaded: false,
  };

  private nodeRef: Maybe<HTMLIFrameElement> = null;

  private mountTarget: Maybe<HTMLDivElement> = null;

  private initialRender = true;

  private htmlWriterTimer: Maybe<number> = null;

  public componentDidMount(): void {
    const doc = this.getDoc();
    if (doc && doc.readyState === 'complete') {
      this.forceUpdate();
    } else {
      this.nodeRef!.addEventListener('load', () => this.forceUpdate());
    }
  }

  private setNodeRef = (i: HTMLIFrameElement) => {
    this.nodeRef = i;
  };

  private getDoc = (): Maybe<Document> => {
    if (!this.nodeRef) {
      return null;
    }
    return this.nodeRef.contentDocument;
  };

  private getMountTarget = (): HTMLDivElement => {
    if (this.mountTarget) {
      return this.mountTarget;
    }

    const doc = this.getDoc()!;
    const node = doc.querySelector(this.props.mountTarget) as Maybe<HTMLDivElement>;
    if (!node) {
      throw 'No entry node in html container';
    }

    this.mountTarget = node;
    return node;
  };

  private writeInitialHTML = (doc: Document) => {
    doc.open('text/html', 'replace');
    doc.write(this.props.htmlContent!);
    doc.close();

    this.initialRender = false;
    this.htmlWriterTimer = window.setInterval(() => {
      if (doc.body) {
        this.props.iframeDidMount!(doc, doc.defaultView!);
        this.setState({ loaded: true });
        window.clearInterval(this.htmlWriterTimer!);
      }
    }, 200);
  };

  private renderContent = () => {
    const doc = this.getDoc();
    if (!doc) {
      return null;
    }

    if (this.initialRender) {
      this.writeInitialHTML(doc);
      return null;
    }

    if (!this.state.loaded) {
      return null;
    }

    const mountTarget = this.getMountTarget();
    const { componentInstances, sharedComponentInstances } = this.props;
    const content = this.props.children(
      doc,
      doc.defaultView!,
      mountTarget,
      componentInstances,
      sharedComponentInstances,
    );
    return createPortal(content, mountTarget);
  };

  public render() {
    return (
      <iframe title="vize-sandbox-renderer" className="render_sandbox" ref={this.setNodeRef}>
        {this.renderContent()}
      </iframe>
    );
  }
}
