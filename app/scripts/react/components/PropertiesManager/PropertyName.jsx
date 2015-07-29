import React, { Component, PropTypes } from 'react';
import MagicSequencer from '../../services/MagicSequencer';
import Select from 'react-select';

//TODO: i18n
const CHOOSE_PROPERTY_NAME_PLACEHOLDER = 'Выберите характеристику',
      ADD_PROPERTY_NAME_PLACEHOLDER = 'Добавить {label} ?',
      PROPERTY_NAME_NOT_FOUND = 'Результаты не найдены'

export default class PropertyName extends Component {
  static propTypes = {
    current: PropTypes.object.isRequired,
    properties: PropTypes.array,
    disabled: PropTypes.bool,
    onNameCreate: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onNameReset: PropTypes.func.isRequired,
  }
  render() {
    return (
      <span>
        <Select
          value={this.props.current.id != null ? '' + this.props.current.id : null}
          options={this.getSelectOptions.call(this)}
          placeholder={CHOOSE_PROPERTY_NAME_PLACEHOLDER}
          addLabelText={ADD_PROPERTY_NAME_PLACEHOLDER}
          noResultsText={PROPERTY_NAME_NOT_FOUND}
          disabled={this.props.disabled}
          allowCreate={true}
          onChange={this.handleSelectChange.bind(this)}
        />
      </span>
    );
  }
  getSelectOptions() {
    const { current, properties } = this.props;
    let arr;

    if (properties) {
      if (current.id) {
        arr = properties.concat(current);
      } else {
        arr = properties;
      }
    }

    return arr.map((property) => ({
      value: property.id + '',
      label: property.name,
      property: property
    }));
  }
  handleSelectChange(value, values) {
    let newProperty = values[0] || null;
    let cbName;

    if (newProperty) {
      if (newProperty.create) {
        cbName = 'onNameCreate';
        newProperty = {
          id: MagicSequencer.next(),
          type: 'PropertyString',
          name: newProperty.label,
          create: true
        }
      } else {
        cbName = 'onNameChange';
        newProperty = {
          ...newProperty.property,
          id: parseInt(value),
          create: false
        };
      }
    } else {
      cbName = 'onNameReset';
    }

    if (!this.props.disabled) {
      this.props[cbName](newProperty);
    }
  }
}