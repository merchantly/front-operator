import React, { Component, PropTypes } from 'react';
import {
  PROPERTY_BOOLEAN_TYPE, PROPERTY_COLOR_TYPE, PROPERTY_DICTIONARY_TYPE, PROPERTY_DOUBLE_TYPE,
  PROPERTY_FILE_TYPE, PROPERTY_LONG_TYPE, PROPERTY_STRING_TYPE, PROPERTY_TEXT_TYPE,
  PROPERTY_TIME_TYPE, PROPERTY_LINK_TYPE,
} from '../../constants/propertyTypes';
import PropertyValueText from './PropertyValueText';
import PropertyValueFile from './PropertyValueFile';
import PropertyValueLink from './PropertyValueLink';
import PropertyValueTime from './PropertyValueTime';
import PropertyValueString from './PropertyValueString';
import PropertyValueNumber from './PropertyValueNumber';
import PropertyValueBoolean from './PropertyValueBoolean';
import PropertyValueDictionary from './PropertyValueDictionary';

class PropertyValue extends Component {
  getInputName({ id, type }) {
    if (id) {
      if (type === PROPERTY_DICTIONARY_TYPE) {
        return `product[custom_attributes][${id}][dictionary_entity_id]`;
      }

      return `product[custom_attributes][${id}][value]`;
    }
  }
  getInputCacheName({ id, type }) {
    if (id) {
      if (type === PROPERTY_DICTIONARY_TYPE) {
        return `product[custom_attributes][${id}][dictionary_entity_id]`;
      }

      return `product[custom_attributes][${id}][value_cache]`;
    }
  }  
  getComponentByType(type) {
    return ({
      [PROPERTY_TEXT_TYPE]: PropertyValueText,
      [PROPERTY_FILE_TYPE]: PropertyValueFile,
      [PROPERTY_LINK_TYPE]: PropertyValueLink,
      [PROPERTY_TIME_TYPE]: PropertyValueTime,
      [PROPERTY_LONG_TYPE]: PropertyValueNumber,
      [PROPERTY_COLOR_TYPE]: PropertyValueDictionary,
      [PROPERTY_DOUBLE_TYPE]: PropertyValueNumber,
      [PROPERTY_STRING_TYPE]: PropertyValueString,
      [PROPERTY_BOOLEAN_TYPE]: PropertyValueBoolean,
      [PROPERTY_DICTIONARY_TYPE]: PropertyValueDictionary,
    })[type];
  }
  render() {
    const { current, onChange, onCreate, t } = this.props;
    const Component = this.getComponentByType(current.type);

    if (typeof Component !== 'function') {
      return (
        <span>{t('properties_manager.unknown_type_of_property')} "{current.type}"</span>
      );
    } else {
      return (
        <Component
          cacheName={this.getInputCacheName(current)}
          key={current.id}
          name={this.getInputName(current)}
          onChange={onChange}
          onCreate={onCreate}
          property={current}
          t={t}
        />
      );
    }
  }
}

PropertyValue.propTypes = {
  current: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default PropertyValue;