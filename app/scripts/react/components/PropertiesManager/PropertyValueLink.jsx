import React, { PropTypes } from 'react';

export default class PropertyValueLink {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  render() {
    return (
      <input
        type="url"
        name={this.props.name}
        value={this.props.property.value}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
}