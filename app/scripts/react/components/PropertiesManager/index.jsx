import React, { Component, PropTypes } from 'react';
import PropertyCreator from './PropertyCreator';
import PropertyList from './PropertyList';

export default class PropertiesManager extends Component {
  static propTypes = {
    properties: PropTypes.array.isRequired,
    selectedProperties: PropTypes.array
  }
  static defaultProps = {
    selectedProperties: [{
      id: 90,
      value: 'Test'
    }, {
      id: 76,
      value: 7
    }],
    // properties: []
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
    properties: this.normalizeProperties(this.props.properties, this.props.selectedProperties)
  }
  render() {
    return (
      <div className="p-b-xxs p-t-xxs">
        <PropertyCreator
          properties={this.getUnselectedProperties()}
          onCreate={this.addProperty.bind(this)}
        />
        <PropertyList
          properties={this.getSelectedProperties()}
          onUpdate={this.updateProperty.bind(this)}
          onDelete={this.deleteProperty.bind(this)}
        />
      </div>
    );
  }
  addProperty(property) {
    // Если свойство существует, то просто делаем его выделенным,
    // иначе оно будет добавлено в конце списка
    let properties = this.state.properties,
        newProperty = {...property, select: true},
        created = properties.filter((prop) => prop.id === property.id)[0];

    if (created) {
      properties = properties.filter((prop) => prop.id !== property.id);
    }

    this.setState({ properties: properties.concat(newProperty) });
  }
  updateProperty(property) {
    this.setState({
      properties: this.state.properties.map((prop) =>
        prop.id === property.id ? property : prop
      )
    })
  }
  deleteProperty(property) {
    // Если свойство существует, то просто убираем его из выделенных,
    // иначе оно было добавлено и не сохранено и мы его удаляем
    let properties = this.state.properties,
        created = this.props.properties.filter((prop) => prop.id + '' === property.id)[0];

    if (created) {
      properties = properties.map((prop) =>
        prop.id === property.id ? {...prop, select: false} : prop
      );
    } else {
      properties = properties.filter((prop) =>
        prop.id !== property.id
      );
    }

    this.setState({ properties });
  }
  normalizeProperties(properties, selectedProperties) {
    let normalizedProperties = [];
    properties.forEach((property) => {
      let normalizedProperty = {...property},
          selected = selectedProperties.filter((prop) => property.id === prop.id)[0];

      if (selected) {
        normalizedProperty = {
          ...property,
          id: property.id + '',
          value: selected.value + '',
          select: true
        }
      } else {
        normalizedProperty = {
          ...property,
          id: property.id + '',
          value: null,
          select: false
        }
      }

      normalizedProperties.push(normalizedProperty);
    });
    return normalizedProperties;
  }
  getSelectedProperties() {
    return this.state.properties.filter((property) => property.select);
  }
  getUnselectedProperties() {
    return this.state.properties.filter((property) => !property.select);
  }
}