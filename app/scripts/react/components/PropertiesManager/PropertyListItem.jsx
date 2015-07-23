import React, { Component, PropTypes } from 'react';
import PropertyName from './PropertyName';
import PropertyValue from './PropertyValue';

export default class PropertyListItem extends Component {
  static propTypes = {
    property: PropTypes.object.isRequired,
    availableProperties: PropTypes.array.isRequired,
    onPropertyDelete: PropTypes.func.isRequired,
    onPropertyValueChange: PropTypes.func.isRequired,
    onUnfixedPropertyErase: PropTypes.func.isRequired
  }
  state = {
    property: this.props.property
  }
  render() {
    return (
      <div className="form-group m-b" key={this.state.property.id}>
        {this.renderName(this.state.property, this.props.availableProperties)}
        <Col sm={6} md={7} lg={8}>
          <PropertyValue
            current={this.state.property}
            onChange={this.props.onPropertyValueChange}
          />
        </Col>
        {this.renderDeleteButton(this.state.property)}
      </div>
    );
  }
  renderName(property, availableProperties) {
    if (property.fixed) {
      return (
        <label className="control-label col-sm-5 col-md-4 col-lg-3">
          {property.name + ' '} {this.renderTooltip(property.tooltip)}
        </label>
      );
    } else {
      return (
        <Col sm={5} md={4} lg={3}>
          <PropertyName
            current={property}
            properties={availableProperties}
            onNameCreate={this.createName.bind(this)}
            onNameChange={this.changeName.bind(this)}
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
  renderDeleteButton(property) {
    if (property.fixed || property.id || property.value) {
      let cbName = property.fixed ? 'onPropertyDelete' : 'onUnfixedPropertyErase';

      return (
        <Col sm={1} xs={2} className="p-l-none">
          <Button
            className="btn-circle btn-sm"
            onClick={this.props[cbName]}
          >
            <i className="fa fa-times" />
          </Button>
        </Col>
      );
    }
  }
  createName(data) {
    const newProperty = {...data, fixed: false, value: null};
    this.setState({ property: newProperty });
  }
  changeName(data) {
    const newProperty = {...data, fixed: false, value: null};
    this.setState({ property: newProperty });
  }
  // addProperty() {
  //   const validationErrors = this.validate();

  //   if (validationErrors.length) {
  //     return alert(validationErrors.join('\r\n'))
  //   }

  //   this.props.onPropertyAdd(this.state.property);
  // }
  // validate() {
  //   const errors = [];

  //   if (!this.state.property.id) {
  //     errors.push('Вы не указали название характеристики');
  //   }

  //   return errors;
  // }


  // resetName(listItemID) {
  //   this.props.onPropertyReset(listItemID);
  // }
}