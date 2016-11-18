import React, { Component, PropTypes } from 'react';
import HiddenInput from '../common/HiddenInput';
import PropertyList from './PropertyList';

class PropertiesManager extends Component {
  renderHiddenInputs(listItems, removedProperties) {
    if (listItems.length === 0 || listItems[0].propertyID === null) {
      return (
        <HiddenInput
          name="product[product_properties_attributes][]"
          value=""
        />
      );
    }
    if (removedProperties.length) {
      return removedProperties.map((property) => (
        <HiddenInput
          key={property.id}
          name={`product[product_properties_attributes][${property.id}][remove_value]`}
          value="1"
        />
      ));
    }
  }
  render() {
    const { listItems, removedProperties } = this.props;

    return (
      <span>
        <PropertyList {...this.props} />
        {this.renderHiddenInputs(listItems, removedProperties)}
      </span>
    );
  }
}

PropertiesManager.propTypes = {
  availableProperties: PropTypes.array.isRequired,
  canCreateListItem: PropTypes.bool.isRequired,
  listItems: PropTypes.array.isRequired,
  onPropertyCreate: PropTypes.func,
  onPropertySwitch: PropTypes.func,
  onPropertyUpdate: PropTypes.func,
  onPropertyValueCreate: PropTypes.func,
  onPropertyDelete: PropTypes.func,
  onListItemAdd: PropTypes.func,
  onListItemDelete: PropTypes.func,
  properties: PropTypes.array.isRequired,
  removedProperties: PropTypes.array.isRequired,
};
PropertiesManager.defaultProps = {
  availableProperties: [],
  canCreateListItem: true,
  listItems: [],
  onListItemAdd: () => {},
  onListItemDelete: () => {},
  onPropertyCreate: () => {},
  onPropertyDelete: () => {},
  onPropertySwitch: () => {},
  onPropertyUpdate: () => {},
  onPropertyValueCreate: () => {},
  properties: [],
  removedProperties: [],
};

export default PropertiesManager;
