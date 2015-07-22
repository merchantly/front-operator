import React, { Component, PropTypes } from 'react';
import * as propertyTypes from '../../constants/propertyTypes';
import Select from 'react-select';

export default class PropertyValue extends Component {
  static propTypes = {
    current: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  render() {
    switch(this.props.current.type) {
      case propertyTypes.PROPERTY_TEXT_TYPE:
        return (
          <textarea
            name={this.getSelectName.call(this)}
            value={this.props.current.value}
            placeholder="Значение"
            className="form-control"
            onChange={this.handleInputChange.bind(this)}
          />
        );
      case propertyTypes.PROPERTY_STRING_TYPE:
        return (
          <input
            type="text"
            name={this.getSelectName.call(this)}
            value={this.props.current.value}
            placeholder="Значение"
            className="form-control"
            onChange={this.handleInputChange.bind(this)}
          />
        );
      case propertyTypes.PROPERTY_DICTIONARY_TYPE:
        return (
          <Select
            name={this.getSelectName.call(this)}
            value={this.props.current.value != null ? this.props.current.value + '' : null}
            options={this.getSelectOptions.call(this)}
            onChange={this.handleSelectChange.bind(this)} />
        );
    }
  }
  getSelectName() {
    if (this.props.current.create) {
      return `product[new_attributes][${this.props.current.id}][value]`;
    } else {
      return `product[custom_attributes][${this.props.current.id}][value]`;
    }
  }
  getSelectOptions() {
    return this.props.current.dictionary.entities.map((entity) => ({
      value: entity.id + '',
      label: entity.title,
      entity: entity
    }));
  }
  handleInputChange(e) {
    this.props.onChange(e.target.value);
  }
  handleSelectChange(value) {
    this.props.onChange(value);
  }
}