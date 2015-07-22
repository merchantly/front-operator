import React, { Component, PropTypes } from 'react';
import * as propertyTypes from '../../constants/propertyTypes';
import PropertyName from './PropertyName';
import PropertyValue from './PropertyValue';

export default class PropertyCreator extends Component {
  static propTypes = {
    properties: PropTypes.array.isRequired,
    onPropertyAdd: PropTypes.func.isRequired
  }
  state = {
    property: this.props.properties[0] || this.getDefaultProperty()
  }
  componentWillReceiveProps(nextProps) {
    const newProperty = nextProps.properties[0] || this.getDefaultProperty();
    this.setState({ property: newProperty });
  }
  render() {
    return (
      <Row>
        <Col sm={11} xs={10}>
          <Row>
            <Col sm={6}>
              <PropertyName
                current={this.state.property}
                properties={this.props.properties}
                onNameCreate={this.createName.bind(this)}
                onNameChange={this.changeName.bind(this)}
                onNameReset={this.resetName.bind(this)}
              />
            </Col>
            <Col sm={6}>
              <PropertyValue
                current={this.state.property}
                onChange={this.changeValue.bind(this)}
              />
            </Col>
          </Row>
        </Col>
        <Col sm={1} xs={2} className="p-l-none">
          <Button
            className="btn-circle btn-sm"
            onClick={this.resetName.bind(this)}>
            <i className="fa fa-times" />
          </Button>
        </Col>
        <Col sm={1} xs={2} className="p-l-none">
          <Button
            bsStyle="primary"
            className="btn-circle btn-sm"
            onClick={this.addProperty.bind(this)}>
            <i className="fa fa-check" />
          </Button>
        </Col>
      </Row>
    );
  }
  getDefaultProperty() {
    return {
      id: null,
      type: propertyTypes.PROPERTY_STRING_TYPE,
      name: null,
      value: null,
      create: false
    }
  }
  createName(data) {
    const newProperty = {...data, value: null};
    this.setState({ property: newProperty });
  }
  changeName(data) {
    const newProperty = {...data, value: null};
    this.setState({ property: newProperty });
  }
  resetName() {
    const newProperty = this.getDefaultProperty();
    this.setState({ property: newProperty });
  }
  changeValue(value) {
    const newProperty = {...this.state.property, value};
    this.setState({ property: newProperty });
  }
  addProperty() {
    const validationErrors = this.validate();

    if (validationErrors.length) {
      return alert(validationErrors.join('\r\n'))
    }

    this.props.onPropertyAdd(this.state.property);
  }
  validate() {
    const errors = [];

    if (!this.state.property.id) {
      errors.push('Вы не указали название характеристики');
    }

    return errors;
  }
}


// import React, { Component, PropTypes } from 'react';
// import Select from 'react-select';
// import PropertyName from './PropertyName';
// import PropertyValue from './PropertyValue';

// export default class PropertyCreator extends Component {
//   static propTypes = {
//     properties: PropTypes.array.isRequired,
//     onCreate: PropTypes.func.isRequired
//   }
//   state = {
//     property: this.getDefaultProperty()
//   }
//   render() {
//     return (
//       <Row>
//         <Col sm={12} xs={10}>
//           <Row>
//             <Col sm={6}>
//               <PropertyName
//                 current={this.state.property}
//                 properties={this.props.properties}
//                 onCreate={this.createName.bind(this)}
//                 onChange={this.changeName.bind(this)}
//               />
//             </Col>
//             {this.renderPropertyValue()}
//             {this.renderCreateButton()}
//           </Row>
//         </Col>
//       </Row>
//     );
//   }
//   renderPropertyValue() {
//     if (this.state.property.id) {
//       return (
//         <Col sm={5}>
//           <PropertyValue
//             current={this.state.property}
//             onChange={this.changeValue.bind(this)}
//           />
//         </Col>
//       );
//     }
//   }
//   renderCreateButton() {
//     if (this.state.property.value) {
//       return (
//         <Col sm={1} xs={2} className="p-l-none">
//           <Button
//             bsStyle="primary"
//             className="btn-circle btn-sm"
//             onClick={this.createProperty.bind(this)}>
//             <i className="fa fa-check" />
//           </Button>
//         </Col>
//       );
//     }
//   }
//   getDefaultProperty() {
//     return {
//       id: null,
//       type: null,
//       name: null,
//       value: null,
//       create: false
//     };
//   }
//   changeName(newProperty) {
//     if (newProperty) {
//       if (newProperty.id !== this.state.property.id) {
//         newProperty.value = null;
//       }
//     } else {
//       newProperty = this.getDefaultProperty()
//     }

//     this.setState({ property: newProperty });
//   }
//   createName(newProperty) {
//     newProperty.value = null;
//     this.setState({ property: newProperty });
//   }
//   changeValue(value) {
//     this.setState({ property: {...this.state.property, value} });
//   }
//   createProperty() {
//     console.log(this.state.property);
//     this.props.onCreate(this.state.property);
//     this.setState({
//       property: this.getDefaultProperty()
//     });
//   }
// }