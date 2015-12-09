import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { PROPERTY_STRING_TYPE } from '../../constants/propertyTypes';
import MagicSequencer from '../../services/MagicSequencer';

//TODO: i18n
const CHOOSE_PROPERTY_NAME_PLACEHOLDER = 'Введите название';
const ADD_PROPERTY_NAME_PLACEHOLDER = 'Добавить {label} ?';
const PROPERTY_NAME_NOT_FOUND = 'Результаты не найдены';

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
          id: MagicSequencer.next(),
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
    const { current, disabled, properties } = this.props;

    return (
      <Select
        addLabelText={ADD_PROPERTY_NAME_PLACEHOLDER}
        allowCreate={true}
        disabled={disabled}
        noResultsText={PROPERTY_NAME_NOT_FOUND}
        onChange={this.handleSelectChange}
        options={this.getSelectOptions(current, properties)}
        placeholder={CHOOSE_PROPERTY_NAME_PLACEHOLDER}
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
};

export default PropertyName;