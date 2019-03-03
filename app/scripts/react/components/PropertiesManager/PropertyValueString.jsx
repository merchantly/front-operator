import React, { Component, PropTypes } from 'react';

class PropertyValueString extends Component {
  render() {
    const { name, property, t } = this.props

    return (
      <input
        type="text"
        name={name}
        value={property.value}
        placeholder={t('properties_manager.property_value_string_placeholder')}
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
  t: PropTypes.func.isRequired
};

export default PropertyValueString;