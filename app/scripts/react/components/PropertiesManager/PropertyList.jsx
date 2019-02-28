import React, { Component, PropTypes } from 'react';
import PropertyListItem from './PropertyListItem';
import PropertyCreateButton from './PropertyCreateButton';

class PropertyList extends Component {
  componentDidUpdate() {
    $(document).trigger('attributes:update');
  }
  getPropertyByID(properties, propertyID) {
    return properties.filter((property) => property.id === propertyID)[0] || null;
  }
  render() {
    const {
      availableProperties, canCreateListItem, listItems, properties,
      onPropertyCreate, onPropertyDelete, onPropertySwitch, onPropertyUpdate,
      onPropertyValueCreate, onListItemAdd, onListItemDelete, t
    } = this.props;
    const createButton = (
      <PropertyCreateButton
        hasItems={!!listItems.length}
        disabled={!canCreateListItem}
        onClick={onListItemAdd}
      />
    );

    if (listItems.length) {
      return (
        <div className="form-horizontal">
          {listItems.map(
            (item) =>
              <PropertyListItem
                availableProperties={availableProperties}
                fixed={item.propertyFixed}
                key={item.id}
                onPropertyCreate={onPropertyCreate.bind(this, item.id)}
                onPropertyDelete={onPropertyDelete.bind(this, item.id)}
                onPropertySwitch={onPropertySwitch.bind(this, item.id)}
                onPropertyValueCreate={onPropertyValueCreate.bind(this, item.id)}
                onPropertyUpdate={onPropertyUpdate.bind(this, item.id)}
                onListItemDelete={onListItemDelete.bind(this, item.id)}
                property={this.getPropertyByID(properties, item.propertyID)}
                t={t}
              />
          )}
          <Row>
            <Col lg={9} lgOffset={3} md={8} mdOffset={4}>
              {createButton}
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="p-lg text-center">
        <p>t('properties_manager.empty_property_list')</p>
        {createButton}
      </div>
    );
  }
}

PropertyList.propTypes = {
  availableProperties: PropTypes.array.isRequired,
  canCreateListItem: PropTypes.bool.isRequired,
  listItems: PropTypes.array.isRequired,
  onPropertyCreate: PropTypes.func.isRequired,
  onPropertySwitch: PropTypes.func.isRequired,
  onPropertyUpdate: PropTypes.func.isRequired,
  onPropertyValueCreate: PropTypes.func.isRequired,
  onPropertyDelete: PropTypes.func.isRequired,
  onListItemAdd: PropTypes.func.isRequired,
  onListItemDelete: PropTypes.func.isRequired,
  properties: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
};

export default PropertyList;