import React, { PropTypes } from 'react';
import Select from 'react-select';

//TODO: i18n
const CHOOSE_PROPERTY_VALUE_PLACEHOLDER = 'Выберите вариант характеристики',
      PROPERTY_VALUE_NOT_FOUND = 'Нет подходящего варианта характеристики';

export default class PropertyValueDictionary {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  render() {
    return (
      <Select
        name={this.props.name}
        value={this.props.property.value != null ? this.props.property.value + '' : null}
        options={this.getSelectOptions.call(this)}
        placeholder={CHOOSE_PROPERTY_VALUE_PLACEHOLDER}
        noResultsText={PROPERTY_VALUE_NOT_FOUND}
        onChange={this.handleSelectChange.bind(this)}
      />
    );
  }
  getSelectOptions() {
    return this.props.property.dictionary.entities.map((entity) => ({
      value: entity.id + '',
      label: entity.title,
      entity: entity
    }));
  }
  handleSelectChange(value) {
    this.props.onChange(value);
  }
}