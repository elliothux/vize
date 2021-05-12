import * as React from 'react';
import { ErrorInfo, PureComponent } from 'react';
import { WithReactChildren, Maybe } from 'types';

interface State {
  error: Maybe<Error>;
  errorInfo: Maybe<ErrorInfo>;
}

export interface ErrorBoundaryProps {
  renderError: (error: Error, errorInfo: ErrorInfo) => React.ReactNode;
}

export class ErrorBoundary extends PureComponent<WithReactChildren<ErrorBoundaryProps>, State> {
  state = { error: null, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return this.props.renderError(this.state.error!, this.state.errorInfo!);
    }

    return this.props.children;
  }
}
