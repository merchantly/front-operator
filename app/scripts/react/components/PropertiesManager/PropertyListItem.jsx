import React, { PropTypes } from 'react';
import * as propertyTypes from '../../constants/propertyTypes';
import PropertyName from './PropertyName';
import PropertyValue from './PropertyValue';

export default class PropertyListItem {
  static propTypes = {
    property: PropTypes.object,
    availableProperties: PropTypes.array.isRequired,
    fixed: PropTypes.bool.isRequired,
    onPropertyCreate: PropTypes.func.isRequired,
    onPropertySwitch: PropTypes.func.isRequired,
    onPropertyUpdate: PropTypes.func.isRequired,
    onPropertyDelete: PropTypes.func.isRequired,
    onListItemDelete: PropTypes.func.isRequired
  }
  render() {
    return (
      <div className="form-group m-b">
        {this.renderName.call(this)}
        <Col sm={6} md={7} lg={8}>
          <PropertyValue
            current={this.getCurrentProperty.call(this)}
            onChange={this.changeValue.bind(this)} />
        </Col>
        {this.renderDeleteButton.call(this)}
      </div>
    );
  }
  renderName() {
    const { property, availableProperties, fixed } = this.props;

    if (property && fixed) {
      return (
        <label className="control-label col-sm-5 col-md-4 col-lg-3">
          {property.name + ' '} {this.renderTooltip(property.tooltip)}
        </label>
      );
    } else {
      return (
        <Col sm={5} md={4} lg={3}>
          <PropertyName
            current={this.getCurrentProperty.call(this)}
            properties={availableProperties}
            onNameCreate={this.props.onPropertyCreate}
            onNameChange={this.props.onPropertySwitch}
            onNameReset={this.props.onPropertyDelete}
          />
        </Col>
      );
    }
  }
  renderTooltip(tooltip) {
    if (tooltip) {
      return (
        <span
          data-container="body"
          data-toggle="popover"
          data-placement="right"
          data-content={tooltip}
          className="tip-trigger"
        >
          <i className="fa fa-question-circle" />
        </span>
      );
    }
  }
  renderDeleteButton() {
    const property = this.getCurrentProperty.call(this);

    if (this.props.fixed || property.id || property.value) {
      return (
        <Col sm={1} xs={2} className="p-l-none">
          <Button
            className="btn-circle btn-sm"
            onClick={this.handleDeleteButtonClick.bind(this)}
          >
            <i className="fa fa-times" />
          </Button>
        </Col>
      );
    }
  }
  getCurrentProperty() {
    return this.props.property || this.getEmptyProperty();
  }
  getEmptyProperty() {
    return {
      id: null,
      type: propertyTypes.PROPERTY_STRING_TYPE,
      name: null,
      value: null,
      create: false      
    };
  }
  changeValue(value) {
    const currentProperty = this.getCurrentProperty.call(this),
          newProperty = {...currentProperty, value};

    this.props.onPropertyUpdate(newProperty);
  }
  handleDeleteButtonClick() {
    if (this.props.fixed) {
      this.props.onListItemDelete();
    } else {
      this.props.onPropertyUpdate(this.getEmptyProperty());
    }
  }
}