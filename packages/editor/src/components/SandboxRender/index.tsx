import * as React from "react";
import { createPortal } from "react-dom";
import { Maybe } from "types";
import { noop } from "../../utils";

import "./index.scss";

interface Props {
  htmlContent: string;
  mountTarget: string;
  children: (
    renderContent: (content: React.ReactNode) => React.ReactNode,
    doc: Document,
    win: Window
  ) => React.ReactNode;
  iframeDidMount?: (doc: Document, win: Window) => void;
}

export class SandboxRender extends React.Component<Props> {
  static defaultProps = {
    iframeDidMount: noop
  };

  public state = {
    loaded: false
  };

  private nodeRef: Maybe<HTMLIFrameElement> = null;

  private mountTarget: Maybe<HTMLDivElement> = null;

  private initialRender: boolean = true;

  private htmlWriterTimer: Maybe<number> = null;

  public componentDidMount(): void {
    const doc = this.getDoc();
    if (doc && doc.readyState === "complete") {
      this.forceUpdate();
    } else {
      this.nodeRef!.addEventListener("load", () => this.forceUpdate());
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
    const node = doc.querySelector(this.props.mountTarget) as Maybe<
      HTMLDivElement
    >;
    if (!node) {
      throw "No entry node in html container";
    }

    this.mountTarget = node;
    return node;
  };

  private writeInitialHTML = (doc: Document) => {
    doc.open("text/html", "replace");
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

  private renderer = (content: React.ReactNode) => {
    return createPortal(content, this.getMountTarget());
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

    // const content = this.props.children(doc, doc.defaultView!);
    // return createPortal(content, this.getMountTarget());
    return this.props.children(this.renderer, doc, doc.defaultView!);
  };

  public render() {
    return (
      <iframe
        title="vize-sandbox-renderer"
        className="sandbox_render"
        ref={this.setNodeRef}
      >
        {this.renderContent()}
      </iframe>
    );
  }
}
