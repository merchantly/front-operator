/*eslint camelcase: 0 */
import React, { Component, PropTypes } from 'react';
import * as constants from './constants';
import DropdownUpdateStatusDumb from './DropdownUpdateStatusDumb';

export default class DropdownUpdateStatus extends Component {
  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    method: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]).isRequired,
        title: PropTypes.string.isRequired,
        color_rgb: PropTypes.string,
      })
    ).isRequired,
    updateUrl: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }
  state = {
    errorMsg: void 0,
    requestStatus: void 0,
    value: void 0,
  }
  errTimeoutId = void 0

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  onChange(value) {
    const { fieldName, method, updateUrl } = this.props;
    const oldValue = this.state.value;

    if (this.errTimeoutId) {
      window.clearTimeout(this.errTimeoutId);
    }
    this.setState({
      value,
      errorMsg: null,
      requestStatus: constants.REQUEST_LOADING
    });

    window.Requester.request({
      method,
      url: updateUrl,
      data: { [fieldName]: value },
    })
      .done((data) =>
        this.setState({
          value: data[fieldName],
          errorMsg: null,
          requestStatus: constants.REQUEST_OK
        })
      )
      .fail((jq, statusText) =>
        this.setState({
          value: oldValue,
          errorMsg: statusText,
          requestStatus: constants.REQUEST_ERROR
        })
      )
      .always(() =>
        this.errTimeoutId = window.setTimeout(() => this.setState({
          errorMsg: null,
          requestStatus: null
        }), 10 * 1000)
      );
  }
  
  render() {
    const { fieldName, method, options, updateUrl } = this.props;

    return (
      <DropdownUpdateStatusDumb
        errorMsg={this.state.errorMsg}
        fieldName={fieldName}
        onChange={this.onChange.bind(this)}
        options={options}
        status={this.state.requestStatus}
        value={this.state.value}
      />
    );
  }
}
