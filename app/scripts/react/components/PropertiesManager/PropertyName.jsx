import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import generateUUID from '../../utils/generateUUID';

export default class PropertyName extends Component {
  static propTypes = {
    current: PropTypes.object.isRequired,
    properties: PropTypes.array,
    disabled: PropTypes.bool,
    onCreate: PropTypes.func,
    onChange: PropTypes.func
  }
  render() {
    return (
      <FormGroup className="m-b">
        <Select
          name={this.getSelectName.call(this)}
          value={this.props.current.id != null ? this.props.current.id + '' : null}
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
    let newProperty = values[0] || null,
        cbName = 'onChange';

    if (newProperty) {
      if (newProperty.create) {
        cbName = 'onCreate';
        newProperty = {
          id: generateUUID(),
          type: 'PropertyString',
          name: newProperty.label,
          create: true
        }
      } else {
        newProperty = {
          ...newProperty.property,
          id: value,
          create: false
        };
      }
    }

    if (!this.props.disabled) {
      this.props[cbName](newProperty);
    }
  }
}