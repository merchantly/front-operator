import React, { PropTypes } from 'react';

//TODO: i18n
const PROPERTY_VALUE_TEXT_PLACEHOLDER = 'Значение свойства';

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
        placeholder={PROPERTY_VALUE_TEXT_PLACEHOLDER}
        className="form-control"
        onChange={this.handleChange.bind(this)}
      />
    );
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
}