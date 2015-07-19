import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

const PROPERTY_TEXT_TYPE = 'PropertyText',
      PROPERTY_STRING_TYPE = 'PropertyString',
      PROPERTY_DICTIONARY_TYPE = 'PropertyDictionary';

export default class PropertyValue extends Component {
  static propTypes = {
    current: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  render() {
    return (
      <FormGroup sm={4} className="m-b">
        {this.renderContent(this.props.current.type)}
      </FormGroup>
    );
  }
  renderContent(propertyType) {
    switch(propertyType) {
      case PROPERTY_TEXT_TYPE:
        return (
          <textarea
            name={this.getSelectName.call(this)}
            value={this.props.current.value}
            placeholder="Значение"
            className="form-control"
            onChange={this.handleInputChange.bind(this)}
          />
        );
      case PROPERTY_STRING_TYPE:
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
      case PROPERTY_DICTIONARY_TYPE:
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