import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

//TODO: i18n
const CHOOSE_PROPERTY_VALUE_PLACEHOLDER = 'Выберите вариант характеристики';
const PROPERTY_VALUE_NOT_FOUND = 'Нет подходящего варианта характеристики';

class PropertyValueDictionary extends Component {
  getSelectOptions(property) {
    return property.dictionary.entities.map(
      ({ id, title }) => ({ value: id, label: title })
    );
  }
  render() {
    const { name, onChange, property } = this.props;

    return (
      <Select
        name={name}
        noResultsText={PROPERTY_VALUE_NOT_FOUND}
        onChange={onChange}
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
  property: PropTypes.object.isRequired,
};

export default PropertyValueDictionary;