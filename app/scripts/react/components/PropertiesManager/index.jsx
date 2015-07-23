import React, { Component, PropTypes } from 'react';
import * as propertyTypes from '../../constants/propertyTypes';
import PropertyCreator from './PropertyCreator';
import PropertyList from './PropertyList';

export default class PropertiesManager extends Component {
  static propTypes = {
    properties: PropTypes.array.isRequired,
    custom_attributes: PropTypes.array.isRequired
  }
  static defaultProps = {
    custom_attributes: [{
      value: 'Test',
      property_id: 90
    }, {
      value: 6,
      property_id: 76
    }],
    properties: [{
      id: 586,
      name: 'Вес',
      tooltip: 'Тултип1',
      type: 'PropertyString'
    }, {
      id: 90,
      name: 'Покрытие',
      tooltip: 'Тултип2',
      type: 'PropertyText'
    }, {
      id: 76,
      name: 'Вставки',
      tooltip: 'Тултип3',
      type: 'PropertyDictionary',
      dictionary: {
        id: 2,
        title: 'Вставки',
        entities: [{
          id: 6,
          title: 'Кубический циркон'
        }, {
          id: 7,
          title: 'Культ. жемчуг, куб. циркон'
        }]
      }
    }]
  }
  state = {
    properties: this.normalizeProperties(this.props.properties, this.props.custom_attributes)
  }
  render() {
    const listActions = {
      onPropertyAdd: this.addProperty.bind(this),
      onPropertyReset: this.resetProperty.bind(this),

      onPropertyUpdate: this.switchProperty.bind(this),
      onPropertyDelete: this.deleteProperty.bind(this),
      onPropertyValueChange: this.changePropertyValue.bind(this),
      onUnfixedPropertyAdd: this.addUnfixedProperty.bind(this),
      onUnfixedPropertyErase: this.eraseUnfixedProperty.bind(this)
    };

    return (
      <PropertyList
        {...listActions}
        properties={this.getSelectedProperties.call(this)}
        availableProperties={this.getAvailableProperties.call(this)}
      />
    );
  }
  getSelectedProperties() {
    return this.state.properties.filter((property) => property.selected);
  }
  getAvailableProperties() {
    return this.state.properties.filter((property) => !property.selected);
  }
  normalizeProperties(properties, customAttributes) {
    const normalizedProperties = [];

    properties.forEach((property) => {
      let selected = customAttributes.filter((attr) => property.id === attr.property_id)[0];

      if (selected) {
        normalizedProperties.push({
          ...property,
          value: selected.value,
          fixed: true,
          selected: true
        });
      } else {
        normalizedProperties.push({
          ...property,
          value: null,
          fixed: true,
          selected: false
        });
      }
    });

    return normalizedProperties;
  }
  changePropertyValue(propertyID, value) {
    this.setState({
      properties: this.state.properties.map((property) =>
        property.id === propertyID ? {...property, value} : property
      )
    });
  }
  hasUnfixedProperty() {
    return this.state.properties.some((property) => property.fixed === false);
  }
  addUnfixedProperty() {
    if (!this.hasUnfixedProperty()) {
      this.setState({
        properties: this.state.properties.concat(this.makeUnfixedProperty())
      });
    }
  }
  addProperty(listItemID, property) {
    // // Если свойство существует, то просто делаем его выделенным,
    // // иначе оно будет добавлено в конце списка
    // const newProperties = this.state.properties.concat(property);
    // const newListItems = this.state.listItems.map((item) =>
    //   item.id === listItemID ? {...item, propertyID: property.id} : item
    // );

    // this.setState({
    //   listItems: newListItems,
    //   properties: newProperties
    // });
  }
  switchProperty(prevProperty, nextProperty) {
    // let newProperties = this.state.properties.map((property) => {
    //   if (property.id === prevProperty.id) {
    //     return {...prevProperty, selected: false, fixed: true};
    //   } else if (property.id === nextProperty.id) {
    //     return {...nextProperty, selected: true, fixed: false};
    //   } else {
    //     return property;
    //   }
    // });

    // let newProperties = this.state.properties.filter((property) =>
    //   property.id != prevProperty.id && property.id != nextProperty.id
    // );

    // if (!prevProperty.fixed) {
    //   newProperties.push({...nextProperty, selected: true, fixed: false});
    // }

    // this.state.properties.forEach((property) => {
    //   if (property.id === prevProperty.id) {
    //     newProperties.push({...prevProperty, selected: false, fixed: true});
    //   } else if (property.id === nextProperty.id) {
    //     newProperties.push({...nextProperty, selected: true, fixed: false});
    //   } else {
    //     newProperties.push(property);
    //   }
    // });






    // let newProperties = this.state.properties.reduce((previous, property) => {
    //   if (property.id === prevProperty.id) {
    //     return {...prevProperty, selected: false, fixed: true};
    //   } else if (property.id === nextProperty.id) {
    //     return {...nextProperty, selected: true, fixed: false};
    //   } else {
    //     return property;
    //   }
    // }, []);




    // if (!prevProperty.fixed) {
    //   newProperties = newProperties.concat([
    //     {...nextProperty, selected: true, fixed: false}
    //   ]);
    // } else {
    //   newProperties = newProperties.concat([
    //     {...prevProperty, selected: false, fixed: nextProperty.fixed},
    //     {...nextProperty, selected: true, fixed: prevProperty.fixed}
    //   ]);
    // }

    // let newProperties = this.state.properties.reduce((previous, property) => {
    //   if (prevProperty)



    //   if (prevPropertyID == null && !property.fixed) {
    //     return previous;
    //   } else if (property.id === prevPropertyID) {
    //     previous.push({...property, selected: false});
    //   } else if (property.id === data.id) {
    //     previous.push({...property, selected: true});
    //   } else {
    //     previous.push(property);
    //   }

    //   return previous;
    //   // if (prevPropertyID == null && !property.fixed) {
    //   //   return previous;
    //   // } else if (property.id === prevPropertyID) {
    //   //   property.selected = false;
    //   //   return previous;
    //   // } else if (property.id === data.id) {
    //   //   property.selected = true;
    //   //   return previous;
    //   // } else {
    //   //   return previous;
    //   // }
    // }, []);
    // console.log(newProperties);

    // this.setState({ properties: newProperties });
  }
  resetProperty(listItemID) {
    // const emptyProperty = this.makeEmptyProperty();

    // this.setState({
    //   listItems: this.state.listItems.map((item) =>
    //     item.id === listItemID ? {...item, property: emptyProperty} : item
    //   )
    // });
  }
  eraseUnfixedProperty() {
    this.setState({
      properties: this.state.properties.map((property) =>
        property.fixed ? property : this.makeUnfixedProperty()
      )
    });
  }
  deleteProperty(propertyID) {
    // Если свойство существует, то просто убираем его из выделенных,
    // иначе оно было добавлено и не сохранено и мы его удаляем
    const isExists = this.props.properties.some((property) =>
      property.id === propertyID
    );

    if (isExists) {
      this.setState({
        properties: this.state.properties.map((prop) =>
          prop.id === propertyID ? {...prop, selected: false, value: null} : prop
        )
      })
    } else {
      this.setState({
        properties: this.state.properties.filter((prop) =>
          prop.id !== propertyID
        )
      })
    }
  }
  makeUnfixedProperty() {
    return {
      id: null,
      type: propertyTypes.PROPERTY_STRING_TYPE,
      name: null,
      value: null,
      fixed: false,
      selected: true,
      create: false
    }
  }
}