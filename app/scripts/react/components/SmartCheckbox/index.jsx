import React, { Component, PropTypes } from 'react';
import { REQUEST_OK, REQUEST_LOADING, REQUEST_ERROR } from '../../constants/requestStatus';
import SmartCheckboxDumb from './SmartCheckboxDumb';

export default class SmartCheckbox extends Component {
  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    hint: PropTypes.string,
    method: PropTypes.string,
    title: PropTypes.string,
    timeoutFailure: PropTypes.number,
    updateUrl: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    method: 'PUT',
    timeoutFailure: 3,
  }
  state = {
    requestStatus: void 0,
    value: void 0,
  }
  statusTimeoutId = void 0

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  resetRequestState(timeout) {
    this.statusTimeoutId = window.setTimeout(() => this.setState({
      requestStatus: null,
    }), timeout * 1000);
  }

  onClick() {
    if (this.state.requestStatus === REQUEST_LOADING) {
      return;
    }

    const { fieldName, method, timeoutFailure, updateUrl } = this.props;
    const oldValue = this.state.value;
    const value = !oldValue;

    if (this.statusTimeoutId) {
      window.clearTimeout(this.statusTimeoutId);
    }
    this.setState({
      value,
      requestStatus: REQUEST_LOADING,
    });

    window.Requester.request({
      method,
      url: updateUrl,
      data: { [fieldName]: value ? 1 : 0 },
    })
      .done(() => {
        this.setState({
          value,
          requestStatus: null,
        });
      })
      .fail((jq) => {
        this.setState({
          value: oldValue,
          requestStatus: REQUEST_ERROR,
        });
        window.alert(jq.responseText);
        this.resetRequestState(timeoutFailure);
      });
  }

  render() {
    const { hint, title } = this.props;
    const { requestStatus: status, value } = this.state;
    const disabled = status === REQUEST_LOADING;

    return (
      <SmartCheckboxDumb
        disabled={disabled}
        hint={hint}
        onClick={this.onClick.bind(this)}
        status={status}
        title={title}
        value={value}
      />
    );
  }
}
