import React, { Component, PropTypes } from 'react';
import PropertyCreator from './PropertyCreator';
import PropertyList from './PropertyList';

export default class PropertiesManager extends Component {
  static propTypes = {
    properties: PropTypes.array.isRequired
  }
  static defaultProps = {
    properties: [{
      "id": 586,
      "name": "Вес",
      "type": "PropertyString"
    }, {
      "id" : 90,
      "name" : "Покрытие",
      "type" : "PropertyText"
    }, {
      "id" : 76,
      "name" : "Вставки",
      "type" : "PropertyDictionary",
      "dictionary": {
        "id" : 2,
        "title" : "Вставки",
        "entities": [{
          "id": 6,
          "title": "Кубический циркон"
        }, {
          "id": 7,
          "title": "Культ. жемчуг, куб. циркон"
        }]
      }
    }]
  }
  state = {
    selectedProperties: []
  }
  componentDidMount() {
    $(React.findDOMNode(this.refs.select)).select2();
  }
  render() {
    return (
      <div className="p-b-xxs p-t-xxs">
        <PropertyCreator
          properties={this.props.properties}
          onCreate={this.createProperty.bind(this)}
        />
        <PropertyList
          properties={this.state.selectedProperties}
          onUpdate={this.updateProperty.bind(this)}
          onDelete={this.deleteProperty.bind(this)}
        />
      </div>
    );
  }
  createProperty(property) {
    this.setState({
      selectedProperties: this.state.selectedProperties.concat(property)
    });
  }
  updateProperty(property) {
    this.setState({
      selectedProperties: this.state.selectedProperties.map((prop) =>
        prop.id === property.id ? property : prop
      )
    })
  }
  deleteProperty(property) {
    this.setState({
      selectedProperties: this.state.selectedProperties.filter((prop) =>
        prop.id !== property.id
      )
    })
  }
}

// <select ref="select" className="form-control">
//                     <option value="Тип">Тип</option>
//                     <option value="Строковый">Строковый</option>
//                     <option value="Числовой">Числовой</option>
//                   </select>