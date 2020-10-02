/* eslint-disable max-lines */
// eslint-disable-next-line max-lines
import * as React from 'react';
import { MarginPaddingField, Props, State } from './types';
import { Switch } from 'antd';
import classnames from 'classnames';

export class BoxEditor extends React.Component<Partial<Props>, State> {
  public state: State = {
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
  };

  handleChange = (name: MarginPaddingField, e: any) => {
    const value = Number(e.target.value);
    this.setState({
      [name]: value,
    });
    this.props.onChange!(name, value);
    // this.props.onFinalChange!(name, value);
  };
  private get specialBorderWidth() {
    return this.props.size! / 7;
  }

  private get containerStyle() {
    return {
      width: this.props.size,
      height: this.props.size! - this.props.size! / 5,
    };
  }
  private get normalBorderWidth() {
    return this.props.size! / 4;
  }

  private toggleAutoMarginRight = () => {
    const marginRight = this.state.marginRight === 'auto' ? 0 : 'auto';

    this.setState({ marginRight });

    this.props.onChange!(MarginPaddingField.MarginRight, marginRight);
  };

  private toggleAutoMarginLeft = () => {
    const marginLeft = this.state.marginLeft === 'auto' ? 0 : 'auto';

    this.setState({ marginLeft });

    this.props.onChange!(MarginPaddingField.MarginLeft, marginLeft);
  };

  private get leftStyle() {
    return {
      left: this.specialBorderWidth as number,
      top: this.props.size! / 2 - this.normalBorderWidth - this.props.size! / 10,
    };
  }

  private get topStyle() {
    return {
      top: this.specialBorderWidth as number,
      left: this.props.size! / 2 - this.normalBorderWidth,
    };
  }

  private get rightStyle() {
    return {
      right: this.specialBorderWidth as number,
      top: this.props.size! / 2 - this.normalBorderWidth - this.props.size! / 10,
    };
  }

  private get bottomStyle() {
    return {
      bottom: this.specialBorderWidth as number,
      left: this.props.size! / 2 - this.normalBorderWidth,
    };
  }

  private get numberOuterLeftStyle() {
    return {
      width: this.specialBorderWidth as number,
      height: this.specialBorderWidth as number,
      left: 0,
      top: this.props.size! / 2 - this.specialBorderWidth / 2 - this.props.size! / 10,
    };
  }

  private get numberOuterTopStyle() {
    return {
      width: this.specialBorderWidth as number,
      height: this.specialBorderWidth as number,
      top: 0,
      left: this.props.size! / 2 - this.specialBorderWidth / 2,
    };
  }

  private get numberOuterRightStyle() {
    return {
      width: this.specialBorderWidth as number,
      height: this.specialBorderWidth as number,
      right: 0,
      top: this.props.size! / 2 - this.specialBorderWidth / 2 - this.props.size! / 10,
    };
  }

  private get numberOuterBottomStyle() {
    return {
      width: this.specialBorderWidth as number,
      height: this.specialBorderWidth as number,
      bottom: 0,
      left: this.props.size! / 2 - this.specialBorderWidth / 2,
    };
  }

  private get numberInnerLeftStyle() {
    return {
      width: this.specialBorderWidth as number,
      height: this.specialBorderWidth as number,
      left: this.props.size! / 3 - this.specialBorderWidth / 2,
      top: this.props.size! / 2 - this.specialBorderWidth / 2 - this.props.size! / 10,
    };
  }

  private get numberInnerTopStyle() {
    return {
      width: this.specialBorderWidth as number,
      height: this.specialBorderWidth as number,
      top: this.props.size! / 3 - this.specialBorderWidth / 2,
      left: this.props.size! / 2 - this.specialBorderWidth / 2,
    };
  }

  private get numberInnerRightStyle() {
    return {
      width: this.specialBorderWidth as number,
      height: this.specialBorderWidth as number,
      right: this.props.size! / 3 - this.specialBorderWidth / 2,
      top: this.props.size! / 2 - this.specialBorderWidth / 2 - this.props.size! / 10,
    };
  }

  private get numberInnerBottomStyle() {
    return {
      width: this.specialBorderWidth as number,
      height: this.specialBorderWidth as number,
      bottom: this.props.size! / 3 - this.specialBorderWidth / 2,
      left: this.props.size! / 2 - this.specialBorderWidth / 2,
    };
  }

  private get outerWidth() {
    return this.props.size! / 20;
  }

  private get outerSpace() {
    return this.props.size! / 40;
  }

  private renderTriangle = (position: string, name: string, extendStyle: React.CSSProperties = {}) => {
    const style: React.CSSProperties = {
      ...extendStyle,
      width: 0,
      height: 0,
    };
    const outerStyle: React.CSSProperties = {};

    const { normalBorderWidth, outerWidth, outerSpace } = this;
    const specialBorderWidth = this.props.size! / 5;

    switch (position) {
      case 'left':
        style.borderTop = `${normalBorderWidth}px solid transparent`;
        style.borderBottom = `${normalBorderWidth}px solid transparent`;
        style.borderRightStyle = 'solid';
        style.borderRightWidth = specialBorderWidth;
        outerStyle.width = outerWidth;
        break;
      case 'top':
        style.borderLeft = `${normalBorderWidth}px solid transparent`;
        style.borderRight = `${normalBorderWidth}px solid transparent`;
        style.borderBottomStyle = 'solid';
        style.borderBottomWidth = specialBorderWidth;
        outerStyle.height = outerWidth as number;
        break;
      case 'right':
        style.borderTop = `${normalBorderWidth}px solid transparent`;
        style.borderBottom = `${normalBorderWidth}px solid transparent`;
        style.borderLeftStyle = 'solid';
        style.borderLeftWidth = specialBorderWidth;
        outerStyle.width = outerWidth;
        break;
      case 'bottom':
        style.borderLeft = `${normalBorderWidth}px solid transparent`;
        style.borderRight = `${normalBorderWidth}px solid transparent`;
        style.borderTopStyle = 'solid';
        style.borderTopWidth = specialBorderWidth;
        outerStyle.height = outerWidth as number;
        break;
    }

    const disabled =
      (name === MarginPaddingField.MarginLeft && this.state.marginLeft === 'auto') ||
      (name === MarginPaddingField.MarginRight && this.state.marginRight === 'auto');

    switch (name) {
      case MarginPaddingField.MarginLeft:
        style.marginLeft = 0;
        break;
      case MarginPaddingField.PaddingLeft:
        style.marginLeft = -outerWidth;
        outerStyle.marginLeft = outerSpace;
        break;
      case MarginPaddingField.MarginTop:
        style.marginTop = 0;
        break;
      case MarginPaddingField.PaddingTop:
        style.marginTop = -outerWidth;
        outerStyle.marginTop = outerSpace;
        break;
      case MarginPaddingField.MarginRight:
        style.marginLeft = -outerWidth * 3;
        outerStyle.marginLeft = outerSpace;
        break;
      case MarginPaddingField.PaddingRight:
        style.marginLeft = -specialBorderWidth / 2;
        break;
      case MarginPaddingField.MarginBottom:
        style.marginTop = -outerWidth * 3;
        outerStyle.marginTop = outerSpace;
        break;
      case MarginPaddingField.PaddingBottom:
        style.marginTop = -specialBorderWidth / 2;
        break;
    }

    return (
      <div className={classnames('distance-style-form-button-container', { disabled })} style={outerStyle}>
        <div
          className={`distance-style-form-button-trigger ${position}`}
          draggable={false}
          // onMouseDown={disabled ? noop : e => this.handleMouseDown(name as MarginPaddingField, e as any)}
          style={style}
        />
      </div>
    );
  };

  private renderControllers = () => {
    return (
      <>
        <div className="distance-style-form-left" style={this.leftStyle}>
          {this.renderTriangle('right', MarginPaddingField.MarginLeft)}
          {this.renderTriangle('right', MarginPaddingField.PaddingLeft, { marginLeft: 5 })}
        </div>
        <div className="distance-style-form-right" style={this.rightStyle}>
          {this.renderTriangle('left', MarginPaddingField.PaddingRight)}
          {this.renderTriangle('left', MarginPaddingField.MarginRight, { marginLeft: 5 })}
        </div>
        <div className="distance-style-form-top" style={this.topStyle}>
          {this.renderTriangle('bottom', MarginPaddingField.MarginTop)}
          {this.renderTriangle('bottom', MarginPaddingField.PaddingTop, { marginTop: 5 })}
        </div>
        <div className="distance-style-form-bottom" style={this.bottomStyle}>
          {this.renderTriangle('top', MarginPaddingField.PaddingBottom)}
          {this.renderTriangle('top', MarginPaddingField.MarginBottom, { marginTop: 5 })}
        </div>
      </>
    );
  };

  private renderMarginInputs = () => {
    const autoMarginRight = this.state.marginRight === 'auto';
    const autoMarginLeft = this.state.marginLeft === 'auto';

    return (
      <>
        <div className="distance-style-form-switch-box" style={this.numberOuterLeftStyle}>
          <span>Auto</span>
          <Switch size="small" checked={autoMarginLeft} onClick={this.toggleAutoMarginLeft} />
          <input
            className={classnames('distance-style-form-number-input', {
              disabled: autoMarginLeft,
            })}
            onChange={this.handleChange.bind(this, MarginPaddingField.MarginLeft)}
            value={this.state.marginLeft}
          />
        </div>
        <div className="distance-style-form-number-box" style={this.numberOuterTopStyle}>
          <input
            className="distance-style-form-number-input"
            onChange={this.handleChange.bind(this, MarginPaddingField.MarginTop)}
            value={this.state.marginTop}
          />
        </div>
        <div className="distance-style-form-switch-box" style={this.numberOuterRightStyle}>
          <span>Auto</span>
          <Switch size="small" checked={autoMarginRight} onClick={this.toggleAutoMarginRight} />
          <input
            className={classnames('distance-style-form-number-input', {
              disabled: autoMarginRight,
            })}
            onChange={this.handleChange.bind(this, MarginPaddingField.MarginRight)}
            value={this.state.marginRight}
          />
        </div>
        <div className="distance-style-form-number-box" style={this.numberOuterBottomStyle}>
          <input
            className="distance-style-form-number-input"
            onChange={this.handleChange.bind(this, MarginPaddingField.MarginBottom)}
            value={this.state.marginBottom}
          />
        </div>
      </>
    );
  };

  private renderPaddingInputs = () => {
    return (
      <>
        <div className="distance-style-form-number-box" style={this.numberInnerLeftStyle}>
          <input
            className="distance-style-form-number-input"
            onChange={this.handleChange.bind(this, MarginPaddingField.PaddingLeft)}
            value={this.state.paddingLeft}
          />
        </div>
        <div className="distance-style-form-number-box" style={this.numberInnerTopStyle}>
          <input
            className="distance-style-form-number-input"
            onChange={this.handleChange.bind(this, MarginPaddingField.PaddingTop)}
            value={this.state.paddingTop}
          />
        </div>
        <div className="distance-style-form-number-box" style={this.numberInnerRightStyle}>
          <input
            className="distance-style-form-number-input"
            onChange={this.handleChange.bind(this, MarginPaddingField.PaddingRight)}
            value={this.state.paddingRight}
          />
        </div>
        <div className="distance-style-form-number-box" style={this.numberInnerBottomStyle}>
          <input
            className="distance-style-form-number-input"
            onChange={this.handleChange.bind(this, MarginPaddingField.PaddingBottom)}
            value={this.state.paddingBottom}
          />
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="distance-style-form-container" style={this.containerStyle}>
        {this.renderControllers()}
        {this.renderMarginInputs()}
        {this.renderPaddingInputs()}
      </div>
    );
  }
}
