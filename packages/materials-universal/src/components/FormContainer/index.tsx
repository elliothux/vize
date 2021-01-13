import './index.scss';
import 'antd-mobile/lib/toast/style/css';
import 'antd-mobile/lib/modal/style/css';
import * as React from 'react';
import { isChildrenEmpty } from '../../lib/utils';
import { EmptyData } from '../../lib/components/EmptyData';

interface Props {
  data: any;
  style: any;
  emit: Function;
  on: Function;
  cancel: Function;
  commonStyle: any;
  children: any;
}

class FormContainer extends React.PureComponent<Props> {
  formValue = {};

  state = {
    showVerifyInfo: false,
    hasSubmited: false,
  };

  componentDidMount() {
    this.props.on('submit', this.onSubmit);
  }

  componentWillUnmount() {
    this.props.cancel('submit', this.onSubmit);
  }

  onSubmit = () => {
    alert('submit');
    setTimeout(() => {
      this.props.emit('submitSuccess');
    }, 1000);
  };

  render() {
    const {
      data: { buttonText },
      style: { buttonTextColor, buttonBackgroundColor } = {},
      children,
      commonStyle,
    } = this.props;

    if (isChildrenEmpty(children)) {
      return <EmptyData text="未添加任何表单子组件" />;
    }

    return (
      <div className="vize-form-container" style={commonStyle}>
        {React.Children.map(children, i => {
          return i
            ? React.cloneElement(i, {
                ...this.state,
                background: commonStyle.background || commonStyle.backgroundColor,
              })
            : null;
        })}
        <button
          type="button"
          className="vize-form-submit"
          onClick={this.onSubmit}
          style={{
            backgroundColor: buttonBackgroundColor || '#08cb6a',
            color: buttonTextColor || '#fff',
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  }
}

export default FormContainer;
