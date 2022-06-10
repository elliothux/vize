import './index.scss';
import * as React from 'react';
import { preventSyntheticEvent } from 'utils';
import { Maybe } from '@vize/types';

interface Props {
  children: string;
  onChange: (v: string) => void;
  editing: boolean;
  onChangeEditing: (editing: boolean) => void;
  onClickText?: Function;
}

export class EditableText extends React.Component<Props> {
  public state = {
    value: this.props.children,
  };

  public componentWillReceiveProps({ children }: Readonly<Props>): void {
    this.setState({ value: children });
  }

  private focusInput = (node: Maybe<HTMLInputElement>) => {
    if (node) {
      node.focus();
    }
  };

  private onInput = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value });
  };

  private onKeyPress = ({ charCode }: React.KeyboardEvent<HTMLInputElement>) => {
    if (charCode !== 13) {
      return;
    }

    const { value } = this.state;
    if (!value) {
      return;
    }

    this.submit();
  };

  private submit = () => {
    this.props.onChange(this.state.value);
    this.props.onChangeEditing(false);
  };

  private onTextClick = (e: React.MouseEvent) => {
    preventSyntheticEvent(e);
    if (this.props.onClickText) {
      this.props.onClickText(e);
    }
  };

  private onTextDoubleClick = () => {
    this.props.onChangeEditing(true);
  };

  public render() {
    const { editing } = this.props;
    const { value } = this.state;

    if (editing) {
      return (
        <input
          className="editable-text-input"
          type="text"
          value={value}
          onChange={this.onInput}
          onKeyPress={this.onKeyPress}
          onBlur={this.submit}
          ref={this.focusInput}
        />
      );
    }

    return (
      <span className="editable-text-value" onDoubleClick={this.onTextDoubleClick} onClick={this.onTextClick}>
        {value}
      </span>
    );
  }
}
