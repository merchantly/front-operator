/*eslint camelcase: 0 */
import React, { Component, PropTypes } from 'react';
import { REQUEST_OK, REQUEST_LOADING, REQUEST_ERROR } from '../../constants/requestStatus';
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
    timeoutFailure: PropTypes.number,
    timeoutSuccess: PropTypes.number,
    updateUrl: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }
  static defaultProps = {
    timeoutFailure: 3,
    timeoutSuccess: 3,
  }
  state = {
    dropup: false,
    errorMsg: void 0,
    requestStatus: void 0,
    value: void 0,
  }
  errTimeoutId = void 0

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  resetRequestState(timeout) {
    this.errTimeoutId = window.setTimeout(() => this.setState({
      errorMsg: null,
      requestStatus: null,
    }), timeout * 1000);
  }

  onChange(value) {
    const { fieldName, method, timeoutSuccess, timeoutFailure, updateUrl } = this.props;
    const oldValue = this.state.value;

    if (this.errTimeoutId) {
      window.clearTimeout(this.errTimeoutId);
    }
    this.setState({
      value,
      errorMsg: null,
      requestStatus: REQUEST_LOADING,
    });

    window.Requester.request({
      method,
      url: updateUrl,
      data: { [fieldName]: value },
    })
      .done(() => {
        this.setState({
          value,
          errorMsg: null,
          requestStatus: REQUEST_OK,
        });
        this.resetRequestState(timeoutSuccess);
      })
      .fail((jq) => {
        this.setState({
          value: oldValue,
          errorMsg: jq.responseText,
          requestStatus: REQUEST_ERROR,
        });
        //TODO: create common error sink
        window.alert(jq.responseText);
        this.resetRequestState(timeoutFailure);
      });
  }

  onOpen() {
    const dumb = this.refs.dumb;
    const menu = dumb.refs.menu.getDOMNode();
    if (!(menu instanceof HTMLElement)) {
      return;
    } 
    
    const menuRect = menu.getBoundingClientRect();
    this.setState({ dropup: (menuRect.bottom > window.innerHeight) });
  }

  onClose() {
    this.setState({ dropup: false });
  }
  
  render() {
    const { fieldName, options } = this.props;
    const { dropup, requestStatus: status, value } = this.state;

    return (
      <SmartSelectDumb
        disabled={status === REQUEST_LOADING}
        dropup={dropup}
        fieldName={fieldName}
        onChange={this.onChange.bind(this)}
        onClose={this.onClose.bind(this)}
        onOpen={this.onOpen.bind(this)}
        options={options}
        ref="dumb"
        status={status}
        value={value}
      />
    );
  }
}
