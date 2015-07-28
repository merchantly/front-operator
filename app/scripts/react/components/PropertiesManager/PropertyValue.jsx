import React, { Component, PropTypes } from 'react';
import * as propertyTypes from '../../constants/propertyTypes';
import PropertyValueText from './PropertyValueText';
import PropertyValueFile from './PropertyValueFile';
import PropertyValueTime from './PropertyValueTime';
import PropertyValueString from './PropertyValueString';
import PropertyValueBoolean from './PropertyValueBoolean';
import PropertyValueDictionary from './PropertyValueDictionary';

export default class PropertyValue extends Component {
  static propTypes = {
    current: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  render() {
    const typeComponents = {
      [propertyTypes.PROPERTY_TEXT_TYPE]: PropertyValueText,
      [propertyTypes.PROPERTY_FILE_TYPE]: PropertyValueFile,
      [propertyTypes.PROPERTY_TIME_TYPE]: PropertyValueTime,
      [propertyTypes.PROPERTY_STRING_TYPE]: PropertyValueString,
      [propertyTypes.PROPERTY_BOOLEAN_TYPE]: PropertyValueBoolean,
      [propertyTypes.PROPERTY_DICTIONARY_TYPE]: PropertyValueDictionary
    };

    const Component = typeComponents[this.props.current.type];
    if (typeof Component !== 'function') {
      return this.renderUnknown();
    } else {
      return (
        <Component
          key={this.props.current.id}
          name={this.getInputName.call(this)}
          property={this.props.current}
          onChange={this.props.onChange}
        />
      );
    }
  }
  renderUnknown() {
    return <span>Неизвестный тип характеристики "{this.props.current.type}"</span>;
  }
  getInputName() {
    if (this.props.current.id) {
      if (this.props.current.create) {
        if (this.props.current.type === propertyTypes.PROPERTY_DICTIONARY_TYPE) {
          return `product[new_attributes][${this.props.current.id}][dictionary_entity_id]`
        } else {
          return `product[new_attributes][${this.props.current.id}][value]`;
        }
      } else {
        if (this.props.current.type === propertyTypes.PROPERTY_DICTIONARY_TYPE) {
          return `product[custom_attributes][${this.props.current.id}][dictionary_entity_id]`;
        } else {
          return `product[custom_attributes][${this.props.current.id}][value]`;
        }
      }
    }
  }
}