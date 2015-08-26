/*eslint camelcase: 0 */
import React, { Component, PropTypes } from 'react';
import * as constants from './constants';
import SmartSelectDumb from './SmartSelectDumb';

export default class SmartSelect extends Component {
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
      requestStatus: constants.REQUEST_LOADING,
    });

    window.Requester.request({
      method,
      url: updateUrl,
      data: { [fieldName]: value },
    })
      .done(() =>
        this.setState({
          value,
          errorMsg: null,
          requestStatus: constants.REQUEST_OK,
        })
      )
      .fail((jq) => {
        this.setState({
          value: oldValue,
          errorMsg: jq.responseText,
          requestStatus: constants.REQUEST_ERROR,
        });
        window.alert(jq.responseText);
      })
      .always(() =>
        this.errTimeoutId = window.setTimeout(() => this.setState({
          errorMsg: null,
          requestStatus: null,
        }), 10 * 1000)
      );
  }
  
  render() {
    const { fieldName, options, dropup } = this.props;

    return (
      <SmartSelectDumb
        disabled={this.state.requestStatus === constants.REQUEST_LOADING}
        dropup={dropup}
        fieldName={fieldName}
        onChange={this.onChange.bind(this)}
        options={options}
        status={this.state.requestStatus}
        value={this.state.value}
      />
    );
  }
}
