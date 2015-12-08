import React, { Component, PropTypes } from 'react';
import { PROPERTY_STRING_TYPE } from '../../constants/propertyTypes';
import HiddenInput from '../common/HiddenInput';
import PropertyName from './PropertyName';
import PropertyValue from './PropertyValue';

class PropertyListItem extends Component {
  constructor(props) {
    super(props);

    this.changeValue = this.changeValue.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }
  getCurrentProperty() {
    return this.props.property || this.getEmptyProperty();
  }
  getEmptyProperty() {
    return {
      id: null,
      type: PROPERTY_STRING_TYPE,
      name: null,
      value: null,
      create: false,
    };
  }
  changeValue(value) {
    const currentProperty = this.getCurrentProperty();
    this.props.onPropertyUpdate({...currentProperty, value});
  }
  handleDeleteButtonClick() {
    const { fixed, onListItemDelete, onPropertyDelete } = this.props;
    fixed ? onListItemDelete() : onPropertyDelete();
  }
  renderHiddenNameInputs(property) {
    if (property.create) {
      return (
        <span>
          <HiddenInput
            name={`product[custom_attributes][${property.id}][type]`}
            value={property.type}
          />
          <HiddenInput
            name={`product[custom_attributes][${property.id}][name]`}
            value={property.name}
          />
        </span>
      );
    }
  }
  renderTooltip(tooltip) {
    return (
      <span
        className="tip-trigger"
        data-container="body"
        data-content={tooltip}
        data-placement="right"
        data-toggle="popover"
        data-trigger="hover"
      >
        <i className="fa fa-question-circle" />
      </span>
    );
  }
  renderName(property, availableProperties, fixed) {
    const { onPropertyCreate, onPropertySwitch, onPropertyDelete } = this.props;

    if (property && fixed) {
      const { name, tooltip } = property;

      return (
        <label className="control-label col-sm-5 col-md-4 col-lg-3">
          {name}
          {property.tooltip && this.renderTooltip(tooltip)}
          {this.renderHiddenNameInputs(property)}
        </label>
      );
    }

    return (
      <Col sm={5} md={4} lg={3}>
        <PropertyName
          current={this.getCurrentProperty()}
          properties={availableProperties}
          onNameCreate={onPropertyCreate}
          onNameChange={onPropertySwitch}
          onNameReset={onPropertyDelete}
        />
        {this.renderHiddenNameInputs(this.getCurrentProperty())}
      </Col>
    );
  }
  renderDeleteButton(fixed) {
    const property = this.getCurrentProperty();

    if (fixed || property.id || property.value) {
      return (
        <Col sm={1} xs={2} className="p-l-none">
          <Button
            className="btn-circle btn-sm"
            onClick={this.handleDeleteButtonClick}
          >
            <i className="fa fa-times" />
          </Button>
        </Col>
      );
    }
  }
  render() {
    const { availableProperties, fixed, property } = this.props;

    return (
      <div className="form-group m-b">
        {this.renderName(property, availableProperties, fixed)}
        <Col sm={6} md={7} lg={8}>
          <PropertyValue
            current={this.getCurrentProperty()}
            onChange={this.changeValue}
          />
        </Col>
        {this.renderDeleteButton(fixed)}
      </div>
    );
  }
}

PropertyListItem.propTypes = {
  availableProperties: PropTypes.array.isRequired,
  fixed: PropTypes.bool.isRequired,
  onPropertyCreate: PropTypes.func.isRequired,
  onPropertySwitch: PropTypes.func.isRequired,
  onPropertyUpdate: PropTypes.func.isRequired,
  onPropertyDelete: PropTypes.func.isRequired,
  onListItemDelete: PropTypes.func.isRequired,
  property: PropTypes.object,
};

export default PropertyListItem;