import React, { PropTypes } from 'react';
import PropertyListItem from './PropertyListItem';
import PropertyCreateButton from './PropertyCreateButton';

export default class PropertyList {
  static propTypes = {
    listItems: PropTypes.array.isRequired,
    properties: PropTypes.array.isRequired,
    availableProperties: PropTypes.array.isRequired,
    canCreateListItem: PropTypes.bool.isRequired,
    onPropertyCreate: PropTypes.func.isRequired,
    onPropertySwitch: PropTypes.func.isRequired,
    onPropertyUpdate: PropTypes.func.isRequired,
    onPropertyDelete: PropTypes.func.isRequired,
    onListItemAdd: PropTypes.func.isRequired,
    onListItemDelete: PropTypes.func.isRequired
  }
  componentDidUpdate() {
    $('[data-toggle="popover"]').popover({ trigger: 'hover' });
  }
  render() {
    if (this.props.listItems.length) {
      return (
        <div className="form-horizontal">
          {this.renderPropertyList.call(this)}
          <Row>
            <Col lg={9} md={8} lgOffset={3} mdOffset={4}>
              <PropertyCreateButton
                disabled={!this.props.canCreateListItem}
                onClick={this.props.onListItemAdd} />
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div className="p-lg text-center">
          <p>Вы не создали характеристики</p>
          <PropertyCreateButton onClick={this.props.onListItemAdd} />
        </div>
      );
    }
  }
  renderPropertyList() {
    return this.props.listItems.map((listItem) =>
      <PropertyListItem
        key={listItem.id}
        property={this.getPropertyByID(this.props.properties, listItem.propertyID)}
        availableProperties={this.props.availableProperties}
        fixed={listItem.propertyFixed}
        onPropertyCreate={this.props.onPropertyCreate.bind(this, listItem.id)}
        onPropertySwitch={this.props.onPropertySwitch.bind(this, listItem.id)}
        onPropertyUpdate={this.props.onPropertyUpdate.bind(this, listItem.id)}
        onPropertyDelete={this.props.onPropertyDelete.bind(this, listItem.id)}
        onListItemDelete={this.props.onListItemDelete.bind(this, listItem.id)}
      />
    );
  }
  getPropertyByID(properties, propertyID) {
    return properties.filter((property) => property.id === propertyID)[0] || null;
  }
}