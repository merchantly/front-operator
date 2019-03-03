import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { next } from '../../services/MagicSequencer';

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
    const { name, property, t} = this.props;

    return (
      <Select
        addLabelText={t('properties_manager.add_property_value_placeholder')}
        allowCreate={true}
        name={name}
        noResultsText={t('properties_manager.property_value_not_found')}
        onChange={this.handleSelectChange}
        options={this.getSelectOptions(property)}
        placeholder={t('properties_manager.choose_property_value_placeholder')}
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
  t: PropTypes.func.isRequired,
};

export default PropertyValueDictionary;