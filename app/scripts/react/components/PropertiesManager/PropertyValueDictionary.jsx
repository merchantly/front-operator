import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { next } from '../../services/MagicSequencer';

//TODO: i18n
const CHOOSE_PROPERTY_VALUE_PLACEHOLDER = 'Введите значение';
const PROPERTY_VALUE_NOT_FOUND = 'Нет подходящего значения характеристики';
const ADD_PROPERTY_VALUE_PLACEHOLDER = 'Добавить {label} ?';

class PropertyValueDictionary extends Component {
  constructor(props) {
    super(props);

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  getSelectOptions(property) {
    return property.dictionary.entities.map(
      ({ id, title }) => ({ value: id, label: title })
    );
  }
  handleSelectChange(value, values) {
    const { onChange, onCreate, property } = this.props;
    const newValue = values[0] || null;

    if (newValue) {
      if (newValue.create) {
        return onCreate({
          id: next(),
          title: value,
          create: true,
        });
      }

      return onChange(value);
    }
  }
  render() {
    const { name, property } = this.props;

    return (
      <Select
        addLabelText={ADD_PROPERTY_VALUE_PLACEHOLDER}
        allowCreate={true}
        name={name}
        noResultsText={PROPERTY_VALUE_NOT_FOUND}
        onChange={this.handleSelectChange}
        options={this.getSelectOptions(property)}
        placeholder={CHOOSE_PROPERTY_VALUE_PLACEHOLDER}
        value={property.value != null ? property.value : null}
      />
    );
  }
}

PropertyValueDictionary.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  property: PropTypes.object.isRequired,
};

export default PropertyValueDictionary;