import React, { PropTypes } from 'react';
import PropertyListItem from './PropertyListItem';
import PropertyCreateButton from './PropertyCreateButton';

export default class PropertyList {
  static propTypes = {
    properties: PropTypes.array.isRequired,
    availableProperties: PropTypes.array.isRequired,
    onPropertyUpdate: PropTypes.func.isRequired,
    onPropertyDelete: PropTypes.func.isRequired,
    onPropertyValueChange: PropTypes.func.isRequired,
    onUnfixedPropertyAdd: PropTypes.func.isRequired,
    onUnfixedPropertyErase: PropTypes.func.isRequired
  }
  // componentDidUpdate() {
  //   $('[data-toggle="popover"]').popover({ trigger: 'hover' });
  // }
  render() {
    return (
      <div className="form-horizontal">
        {this.renderPropertyList.call(this)}
        <Row>
          <Col lg={9} md={8} lgOffset={3} mdOffset={4}>
            <PropertyCreateButton onClick={this.props.onUnfixedPropertyAdd} />
          </Col>
        </Row>
      </div>
    );
  }
  renderPropertyList() {
    return this.props.properties.map((property) =>
      <PropertyListItem
        property={property}
        availableProperties={this.props.availableProperties}
        onPropertyUpdate={this.props.onPropertyUpdate.bind(this, property)}
        onPropertyDelete={this.props.onPropertyDelete.bind(this, property.id)}
        onPropertyValueChange={this.props.onPropertyValueChange.bind(this, property.id)}
        onUnfixedPropertyErase={this.props.onUnfixedPropertyErase}
        key={property.id}
      />
    );
  }
}