import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default class ICheck {
  static propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }
  componentDidMount() {
    const node = findDOMNode(this.refs.checkbox);
    $(node).iCheck({
      radioClass: 'iradio_flat-blue',
      checkboxClass: 'icheckbox_flat-blue',
      indeterminateClass: 'indeterminate'
    });
    $(node).on('ifToggled', this.handleToggle.bind(this));
  }
  componentWillUnmount() {
    const node = findDOMNode(this.refs.checkbox);
    $(node).off('ifToggled', this.handleToggle.bind(this));
    $(node).iCheck('destroy');
  }
  render() {
    return (
      <span>
        <input
          type="hidden"
          name={this.props.name}
          value="0"
        />
        <input
          ref="checkbox"
          type="checkbox"
          name={this.props.name}
          className="i-checks"
          defaultChecked={this.props.checked}
          value="1"
        />
      </span>
    );
  }
  handleToggle(e) {
    this.props.onChange(e.target.checked);
  }
}
