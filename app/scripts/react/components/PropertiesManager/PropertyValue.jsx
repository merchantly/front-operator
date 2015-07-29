import React, { Component, PropTypes } from 'react';
import * as propertyTypes from '../../constants/propertyTypes';
import PropertyValueText from './PropertyValueText';
import PropertyValueFile from './PropertyValueFile';
import PropertyValueLink from './PropertyValueLink';
import PropertyValueTime from './PropertyValueTime';
import PropertyValueString from './PropertyValueString';
import PropertyValueNumber from './PropertyValueNumber';
import PropertyValueBoolean from './PropertyValueBoolean';
import PropertyValueDictionary from './PropertyValueDictionary';

//TODO: i18n
const UNKNOWN_TYPE_OF_PROPERTY = 'Неизвестный тип характеристики';

export default class PropertyValue extends Component {
  static propTypes = {
    current: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  render() {
    const typeComponents = {
      [propertyTypes.PROPERTY_TEXT_TYPE]: PropertyValueText,
      [propertyTypes.PROPERTY_FILE_TYPE]: PropertyValueFile,
      [propertyTypes.PROPERTY_LINK_TYPE]: PropertyValueLink,
      [propertyTypes.PROPERTY_TIME_TYPE]: PropertyValueTime,
      [propertyTypes.PROPERTY_LONG_TYPE]: PropertyValueNumber,
      [propertyTypes.PROPERTY_COLOR_TYPE]: PropertyValueDictionary,
      [propertyTypes.PROPERTY_DOUBLE_TYPE]: PropertyValueNumber,
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
          cacheName={this.getInputCacheName.call(this)}
          property={this.props.current}
          onChange={this.props.onChange}
        />
      );
    }
  }
  renderUnknown() {
    return <span>{UNKNOWN_TYPE_OF_PROPERTY} "{this.props.current.type}"</span>;
  }
  getInputName() {
    if (this.props.current.id) {
      if (this.props.current.type === propertyTypes.PROPERTY_DICTIONARY_TYPE) {
        return `product[custom_attributes][${this.props.current.id}][dictionary_entity_id]`;
      } else {
        return `product[custom_attributes][${this.props.current.id}][value]`;
      }
    }
  }
  getInputCacheName() {
    if (this.props.current.id) {
      if (this.props.current.type === propertyTypes.PROPERTY_DICTIONARY_TYPE) {
        return `product[custom_attributes][${this.props.current.id}][dictionary_entity_id]`;
      } else {
        return `product[custom_attributes][${this.props.current.id}][value_cache]`;
      }
    }
  }          
}