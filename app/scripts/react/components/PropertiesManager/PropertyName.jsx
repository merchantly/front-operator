import React, { Component, PropTypes } from 'react';
import generateUUID from '../../utils/generateUUID';
import Select from 'react-select';

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
      <FormGroup className="m-b">
        <Select
          name={this.getSelectName.call(this)}
          value={this.props.current.id != null ? '' + this.props.current.id : null}
          options={this.getSelectOptions.call(this)}
          disabled={this.props.disabled}
          allowCreate={true}
          onChange={this.handleSelectChange.bind(this)}
        />
      </FormGroup>
    );
  }
  getSelectName() {
    if (this.props.current.create) {
      return `product[new_attributes][${this.props.current.id}][name]`;
    } else {
      return `product[custom_attributes][${this.props.current.id}][name]`;
    }
  }
  getSelectOptions() {
    const { current, properties } = this.props;
    const arr = properties ? properties.concat(current) : [current];

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
          id: generateUUID(),
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