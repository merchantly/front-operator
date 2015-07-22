import React, { PropTypes } from 'react';
import PropertyValue from './PropertyValue';

export default class PropertyList {
  static propTypes = {
    properties: PropTypes.array.isRequired,
    onPropertyUpdate: PropTypes.func.isRequired,
    onPropertyDelete: PropTypes.func.isRequired
  }
  componentDidUpdate() {
    $('[data-toggle="popover"]').popover({ trigger: 'hover' });
  }
  render() {
    return (
      <div className="form-horizontal">
        {this.renderPropertyList.call(this)}
      </div>
    );
  }
  renderPropertyList() {
    return this.props.properties.map((prop) => (
      <div className="form-group m-b" key={prop.id}>
        <label className="control-label col-sm-5 col-md-4 col-lg-3">
          {prop.name + ' '}
          {this.renderTip(prop.tooltip)}
        </label>
        <Col sm={6} md={7} lg={8}>
          <PropertyValue
            current={prop}
            onChange={this.changeValue.bind(this, prop)}
          />
        </Col>
        <Col sm={1} xs={2} className="p-l-none">
          <Button
            className="btn-circle btn-sm"
            onClick={() => this.props.onPropertyDelete(prop)}
          >
            <i className="fa fa-times" />
          </Button>
        </Col>
      </div>
    ));
  }
  renderTip(tooltip) {
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
  changeValue(property, value) {
    const newProperty = {...property, value};
    this.props.onPropertyUpdate(newProperty);
  }
}




    //   <Row key={property.id}>
    //     <Col sm={6}>
    //       <PropertyName current={property} disabled />
    //     </Col>
    //     <Col sm={5}>
    //       <PropertyValue
    //         current={property}
    //         onChange={this.changeValue.bind(this, property)}
    //       />
    //     </Col>
    //     <Col sm={1} xs={2} className="p-l-none">
    //       <Button
    //         className="btn-circle btn-sm"
    //         onClick={() => this.props.onDelete(property)}
    //       >
    //         <i className="fa fa-times" />
    //       </Button>
    //     </Col>
    //   </Row>      
    // ));

// import React, { PropTypes } from 'react';
// import PropertyName from './PropertyName';
// import PropertyValue from './PropertyValue';

// export default class PropertyList {
//   static propTypes = {
//     properties: PropTypes.array.isRequired,
//     onUpdate: PropTypes.func.isRequired,
//     onDelete: PropTypes.func.isRequired
//   }
//   render() {
//     return (
//       <Row>
//         <Col sm={12} xs={10}>
//           {this.renderPropertyList.call(this)}
//         </Col>
//       </Row>
//     );
//   }
//   renderPropertyList() {
//     return this.props.properties.map((property) => (
//       <Row key={property.id}>
//         <Col sm={6}>
//           <PropertyName current={property} disabled />
//         </Col>
//         <Col sm={5}>
//           <PropertyValue
//             current={property}
//             onChange={this.changeValue.bind(this, property)}
//           />
//         </Col>
//         <Col sm={1} xs={2} className="p-l-none">
//           <Button
//             className="btn-circle btn-sm"
//             onClick={() => this.props.onDelete(property)}
//           >
//             <i className="fa fa-times" />
//           </Button>
//         </Col>
//       </Row>      
//     ));
//   }
//   changeValue(property, value) {
//     this.props.onUpdate({
//       ...property,
//       value
//     });
//   }
// }