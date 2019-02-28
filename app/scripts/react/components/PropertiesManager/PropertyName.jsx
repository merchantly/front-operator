import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { PROPERTY_STRING_TYPE } from '../../constants/propertyTypes';
import { next } from '../../services/MagicSequencer';

class PropertyName extends Component {
  constructor(props) {
    super(props);

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  getSelectOptions(current, properties) {
    let arr;

    if (properties) {
      if (current.id) {
        arr = properties.concat(current);
      } else {
        arr = properties;
      }
    }

    return arr.map(
      (property) => ({
        value: property.id,
        label: property.name,
        property: property,
      })
    );
  }
  handleSelectChange(value, values) {
    const { onNameChange, onNameCreate, onNameReset } = this.props;
    const newProperty = values[0] || null;

    if (newProperty) {
      if (newProperty.create) {
        return onNameCreate({
          id: next(),
          type: PROPERTY_STRING_TYPE,
          name: newProperty.label,
          create: true,
        });
      }

      return onNameChange({
        ...newProperty.property,
        id: value,
        create: false
      });
    }

    onNameReset();
  }
  render() {
    const { current, disabled, properties, t } = this.props;

    return (
      <Select
        addLabelText={t('properties_manager.add_property_name_placeholder')}
        allowCreate={true}
        disabled={disabled}
        noResultsText={t('properties_manager.property_name_not_found')}
        onChange={this.handleSelectChange}
        options={this.getSelectOptions(current, properties)}
        placeholder={t('properties_manager.choose_property_name_placeholder')}
        value={current.id != null ? current.id : null}
      />
    );
  }
}

PropertyName.propTypes = {
  current: PropTypes.object.isRequired,
  onNameCreate: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNameReset: PropTypes.func.isRequired,
  properties: PropTypes.array,
  t: PropTypes.func.isRequired,
};

export default PropertyName;