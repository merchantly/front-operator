import React, { PropTypes } from 'react';

//TODO: i18n
const PROPERTY_VALUE_LINK_PLACEHOLDER = 'Значение свойства';

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
        placeholder={PROPERTY_VALUE_LINK_PLACEHOLDER}
        className="form-control"
        onChange={this.handleChange.bind(this)}
      />
    );
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
}