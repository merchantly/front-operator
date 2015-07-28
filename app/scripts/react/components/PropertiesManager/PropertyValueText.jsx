import React, { PropTypes } from 'react';

export default class PropertyValueText {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired
  }
  render() {
    return (
      <textarea
        name={this.props.name}
        value={this.props.property.value}
        placeholder="Значение"
        className="form-control"
        onChange={this.handleChange.bind(this)}
      />
    );
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
}