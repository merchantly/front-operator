import uuid from 'uuid';
import React, { Component, PropTypes } from 'react';
import MagicSequencer from '../../services/MagicSequencer';
import * as propertyTypes from '../../constants/propertyTypes';
import PropertiesManager from './PropertiesManager';

class PropertiesManagerContainer extends Component {
  constructor(props) {
    super(props);
    const { custom_attributes, properties } = props;

    this.state = {
      listItems: this.makeListItems(properties, custom_attributes),
      properties: this.normalizeProperties(properties, custom_attributes),
    };
    this.addListItem = this.addListItem.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.createProperty = this.createProperty.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
    this.switchProperty = this.switchProperty.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
  }
  componentDidMount() {
    const biggestID = this.getBiggestID(this.props.custom_attributes);
    MagicSequencer.setIfBigger(biggestID);
  }
  isPropertySelected(property, customAttributes) {
    return customAttributes.some((attr) => property.id === attr.property_id);
  }
  isPropertyAvailable(property, listItems) {
    return !listItems.some((item) => property.id === item.propertyID);
  }
  isPropertyFile(property) {
    return property.type === propertyTypes.PROPERTY_FILE_TYPE;
  }
  hasEmptyListItem(listItems) {
    return listItems.some((item) => item.propertyID === null);
  }
  getAvailableProperties(properties, listItems) {
    return properties.filter(
      (property) => this.isPropertyAvailable(property, listItems)
    );
  }
  getRemovedFileProperties(properties, initialProperties) {
    const propertyFileIDs = initialProperties.reduce(
      (fileIDs, property) => {
        if (this.isPropertyFile(property)) {
          return [...fileIDs, property.id];
        }

        return fileIDs;
      },
      []
    );
    const removedFileProperties = properties.reduce(
      (files, property) => {
        if (propertyFileIDs.indexOf(property.id) > -1
            && property.originalValue !== null
            && property.value === null) {
          return [...files, property];
        }

        return files;
      },
      []
    );

    return removedFileProperties;
  }
  getBiggestID(customAttributes) {
    return customAttributes.reduce(
      (biggestID, attr) => (attr.property_id > biggestID ? attr.property_id : biggestID),
      0
    );
  }
  getPropertyAttributes(property, customAttributes) {
    for (let i = 0; i < customAttributes.length; i++) {
      const attr = customAttributes[i];
      if (attr.property_id === property.id) return attr;
    }

    return null;
  }
  getListItemByID(listItems, listItemID) {
    return listItems.filter((item) => item.id === listItemID)[0] || null;
  }
  getPropertyByID(properties, propertyID) {
    return properties.filter((property) => property.id === propertyID)[0] || null;
  }
  makeListItems(properties, customAttributes) {
    return properties.reduce(
      (listItems, property) => {
        if (this.isPropertySelected(property, customAttributes)) {
          return [
            ...listItems,
            {
              id: uuid.v4(),
              propertyID: property.id,
              propertyFixed: true,
            }
          ];
        }

        return listItems;
      },
      []
    );
  }
  normalizeProperties(properties, customAttributes) {
    return properties.reduce(
      (listItems, property) => {
        const propertyAttrs = this.getPropertyAttributes(property, customAttributes);

        if (propertyAttrs) {
          return [
            ...listItems,
            {
              ...property,
              ...propertyAttrs,
              originalValue: propertyAttrs.value,
            }
          ];
        } else {
          return [
            ...listItems,
            {
              ...property,
              originalValue: null,
              value: null,
            }
          ];
        }
      },
      []
    );
  }
  createProperty(listItemID, property) {
    // Добавляем свойство и указываем его в элементе списка:
    // Варианты:
    // 1) listItem найден, но не содержит propertyID. Добавляем propertyID в
    //    listItem, добавляем property в список свойств.
    // 2) listItem найден и уже содержит propertyID. Удаляем property, id которого
    //    указан в propertyID если свойство не существовало изначально. Устанавливаем
    //    новый propertyID, добавляем property в список свойств.
    const { properties: initialProperties } = this.props;
    const { listItems, properties } = this.state;
    const listItem = this.getListItemByID(listItems, listItemID);
    let newProperties = [...properties, property];

    if (listItem.propertyID) {
      const isPropertyExistsInitially = this.getPropertyByID(initialProperties, listItem.propertyID);

      if (!isPropertyExistsInitially) {
        newProperties = newProperties.filter(
          (prop) => prop.id !== listItem.propertyID
        );
      }
    }

    const newListItems = listItems.map(
      (item) =>
        item.id === listItemID ? {...item, propertyID: property.id} : item
    );

    this.setState({
      listItems: newListItems,
      properties: newProperties
    });
  }
  switchProperty(listItemID, property) {
    // Переключаем свойство и указываем его в элементе списка:
    // Варианты:
    // 1) listItem найден, но не содержит propertyID. Добавляем propertyID в
    //    listItem.
    // 2) listItem найден и уже содержит propertyID. Удаляем property, id которого
    //    указан в propertyID если свойство не существовало изначально. Устанавливаем
    //    новый propertyID.
    const { listItems, properties } = this.state;
    const newListItem = this.getListItemByID(listItems, listItemID);
    const newProperty = this.getPropertyByID(properties, property.id);
    let newProperties = properties;

    if (newListItem.propertyID) {
      let isPropertyExistsInitially = this.getPropertyByID(properties, newListItem.propertyID);

      if (!isPropertyExistsInitially) {
        newProperties = newProperties.filter(
          (prop) => prop.id !== newListItem.propertyID
        );
      }
    }

    const newListItems = listItems.map(
      (item) => item.id === listItemID ? {...item, propertyID: property.id} : item
    );

    this.setState({
      listItems: newListItems,
      properties: newProperties
    });
  }
  updateProperty(listItemID, property) {
    const { listItems, properties } = this.state;
    const newListItem = this.getListItemByID(listItems, listItemID);
    const newProperty = this.getPropertyByID(properties, property.id);
    let newProperties, newListItems;

    if (newProperty) {
      newProperties = properties.map(
        (prop) => prop.id === property.id ? property : prop
      );
    } else {
      newProperties = [...properties, property];
    }

    if (newListItem) {
      newListItems = listItems.map(
        (item) => item.id === listItemID ? {...newListItem, propertyID: property.id} : item
      );
    } else {
      newListItems = [
        ...listItems,
        {
          id: uuid.v4(),
          propertyID: property.id,
          propertyFixed: false
        }
      ];
    }

    this.setState({
      listItems: newListItems,
      properties: newProperties
    });
  }
  deleteProperty(listItemID) {
    const { properties: initialProperties } = this.props;
    const { listItems, properties } = this.state;
    const listItem = this.getListItemByID(listItems, listItemID);
    let property, isPropertyExistsInitially;

    if (listItem) {
      property = this.getPropertyByID(properties, listItem.propertyID);
    }
    if (property) {
      isPropertyExistsInitially = this.getPropertyByID(initialProperties, property.id)
    }

    if (isPropertyExistsInitially) {
      this.setState({
        properties: properties.map(
          (prop) => prop.id === property.id ? {...prop, value: null} : prop
        ),
        listItems: listItems.map(
          (item) => item.id === listItemID ? {...item, propertyID: null} : item
        ),
      });
    } else {
      this.setState({
        properties: properties.filter(
          (prop) => prop.id !== property.id
        ),
        listItems: listItems.map(
          (item) => item.id === listItemID ? {...item, propertyID: null} : item
        ),
      });
    }
  }
  addListItem() {
    const { listItems } = this.state;

    if (!this.hasEmptyListItem(listItems)) {
      const newListItems = [
        ...listItems.map(
          (item) =>
            !item.propertyFixed ? {...item, propertyFixed: true} : item
        ),
        {
          id: uuid.v4(),
          propertyID: null,
          propertyFixed: false,
        },
      ];

      this.setState({ listItems: newListItems });
    }
  }
  deleteListItem(listItemID) {
    // Берем свойство по идентификатору из элемента списка:
    // Варианты:
    // 1) listItem найден, property найден. Удаляем listItem, удаляем property
    //    если он был создан временно, если property был создан изначально, то
    //    сбрасываем его value.
    // 2) listItem найден, property не найден. Удаляем listItem
    const { properties: initialProperties } = this.props;
    const { listItems, properties } = this.state;
    const listItem = this.getListItemByID(listItems, listItemID);
    let property, isPropertyExistsInitially;

    if (listItem) {
      property = this.getPropertyByID(properties, listItem.propertyID);
    }
    if (property) {
      isPropertyExistsInitially = this.getPropertyByID(initialProperties, property.id)
    }

    if (isPropertyExistsInitially) {
      this.setState({
        listItems: listItems.filter(
          (item) => item.id !== listItemID
        ),
        properties: properties.map(
          (prop) =>
            prop.id === property.id ? {...prop, value: null} : prop
        ),
      });
    } else {
      this.setState({
        listItems: listItems.filter(
          (item) => item.id !== listItemID
        ),
        properties: properties.filter(
          (prop) => prop.id !== property.id
        ),
      });
    }
  }
  render() {
    const { properties: initialProperties } = this.props;
    const { listItems, properties } = this.state;
    const actionList = {
      onListItemAdd: this.addListItem,
      onListItemDelete: this.deleteListItem,
      onPropertyCreate: this.createProperty,
      onPropertyDelete: this.deleteProperty,
      onPropertySwitch: this.switchProperty,
      onPropertyUpdate: this.updateProperty,
    };

    return (
      <PropertiesManager
        {...this.state}
        {...actionList}
        availableProperties={this.getAvailableProperties(properties, listItems)}
        canCreateListItem={!this.hasEmptyListItem(listItems)}
        removedProperties={this.getRemovedFileProperties(properties, initialProperties)}
      />
    );
  }
}

PropertiesManagerContainer.propTypes = {
  custom_attributes: PropTypes.array,
  properties: PropTypes.array,
};
// PropertiesManagerContainer.defaultProps = {
//   custom_attributes: [],
//   properties: [],
// };
PropertiesManagerContainer.defaultProps = {
  "custom_attributes": [
    {
      "value": 923,
      "property_id": 757,
      "is_editable": true
    },
    {
      "value": "test",
      "property_id": 66,
      "is_editable": true
    }
  ],
  "properties": [
    {
      "id": 757,
      "name": "Бренд",
      "type": "PropertyDictionary",
      "tooltip": "Словарь",
      "dictionary": {
        "id": 137,
        "title": "Бренды",
        "entities": [
          {
            "id": 923,
            "title": "D&Gi"
          },
          {
            "id": 924,
            "title": "GJ"
          },
          {
            "id": 922,
            "title": "Gucci"
          }
        ]
      }
    },
    {
      "id": 66,
      "name": "Размер",
      "type": "PropertyString",
      "tooltip": "Строка"
    },
    {
      "id": 65,
      "name": "Цвет",
      "type": "PropertyString",
      "tooltip": "Строка"
    }
  ]
}

export default PropertiesManagerContainer;