import React, { PropTypes } from 'react';
import PropertyName from './PropertyName';
import PropertyValue from './PropertyValue';

export default class PropertyList {
  static propTypes = {
    properties: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }
  render() {
    return (
      <Row>
        <Col sm={12} xs={10}>
          {this.renderPropertyList.call(this)}
        </Col>
      </Row>
    );
  }
  renderPropertyList() {
    return this.props.properties.map((property) => (
      <Row>
        <Col sm={6}>
          <PropertyName current={property} disabled />
        </Col>
        <Col sm={5}>
          <PropertyValue
            current={property}
            onChange={this.changeValue.bind(this, property)}
          />
        </Col>
        <Col sm={1} xs={2} className="p-l-none">
          <Button
            className="btn-circle btn-sm"
            onClick={() => this.props.onDelete(property)}
          >
            <i className="fa fa-times" />
          </Button>
        </Col>
      </Row>      
    ));
  }
  changeValue(property, value) {
    this.props.onUpdate({
      ...property,
      value
    });
  }
}