import React, { Component, PropTypes } from 'react';

//TODO: i18n
const PROPERTY_VALUE_STRING_PLACEHOLDER = 'Значение свойства';

class PropertyValueString extends Component {
  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        value={this.props.property.value}
        placeholder={PROPERTY_VALUE_STRING_PLACEHOLDER}
        className="form-control"
        onChange={this.handleChange.bind(this)}
      />
    );
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
}

PropertyValueString.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  property: PropTypes.object.isRequired,
};

export default PropertyValueString;