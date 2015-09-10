import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import MagicSequencer from '../../services/MagicSequencer';
import * as propertyTypes from '../../constants/propertyTypes';
import PropertyList from './PropertyList';

export default class PropertiesManager extends Component {
  static propTypes = {
    properties: PropTypes.array,
    custom_attributes: PropTypes.array
  }
  static defaultProps = {
    properties: [],
    custom_attributes: [],
  }
  state = {
    listItems: this.makeListItems(this.props.properties, this.props.custom_attributes),
    properties: this.normalizeProperties(this.props.properties, this.props.custom_attributes)
  }
  componentDidMount() {
    const biggestID = this.props.custom_attributes.reduce((biggestID, attr) => {
      return attr.property_id > biggestID ? attr.property_id : biggestID;
    }, 0);

    MagicSequencer.setIfBigger(biggestID);
  }
  render() {
    const listActions = {
      onPropertyCreate: this.createProperty.bind(this),
      onPropertySwitch: this.switchProperty.bind(this),
      onPropertyUpdate: this.updateProperty.bind(this),
      onPropertyDelete: this.deleteProperty.bind(this),
      onListItemAdd: this.addListItem.bind(this),
      onListItemDelete: this.deleteListItem.bind(this)
    };

    return (
      <span>
        <PropertyList
          {...this.state}
          {...listActions}
          availableProperties={this.getAvailableProperties.call(this)}
          canCreateListItem={!this.hasEmptyListItem.call(this)}
        />
        {this.renderHiddenInputs.call(this)}
      </span>
    );
  }
  renderHiddenInputs() {
    const { listItems } = this.state;

    if (listItems.length === 0 || listItems[0].propertyID === null) {
      return <input type="hidden" name="product[custom_attributes][]" value="" />
    } else {
      return this.renderRemovedFiles();
    }
  }
  renderRemovedFiles() {
    const propertyFileIDs = this.props.properties.reduce((previous, property) => {
      if (property.type === propertyTypes.PROPERTY_FILE_TYPE) {
        previous.push(property.id);
      }
      return previous;
    }, []);

    const removedFiles = this.state.properties.reduce((previous, property) => {
      if (propertyFileIDs.indexOf(property.id) != -1 && property.value === null && property.originalValue !== null) {
        previous.push(
          <input
            key={property.id}
            type="hidden"
            name={`product[custom_attributes][${property.id}][remove_value]`}
            value="1"
          />
        );
      }
      return previous;
    }, []);

    return removedFiles;
  }
  normalizeProperties(properties, customAttributes) {
    const normalizedProperties = [];

    properties.forEach((property) => {
      let selected = customAttributes.filter((attr) => property.id === attr.property_id)[0];

      if (selected) {
        normalizedProperties.push({...property, ...selected, originalValue: selected.value});
      } else {
        normalizedProperties.push({...property, value: null, originalValue: null});
      }
    });

    return normalizedProperties;
  }
  makeListItems(properties, customAttributes) {
    const listItems = [];

    properties.forEach((property) => {
      let isSelected = customAttributes.some((attr) => property.id === attr.property_id);

      if (isSelected) {
        listItems.push({
          id: uuid.v4(),
          propertyID: property.id,
          propertyFixed: true
        });
      }
    });

    return listItems;
  }
  getAvailableProperties() {
    return this.state.properties.filter((property) => {
      for (let i = 0; i < this.state.listItems.length; i++) {
        if (this.state.listItems[i].propertyID === property.id) {
          return false;
        }
      }
      return true;
    });
  }
  getListItemByID(listItems, listItemID) {
    return listItems.filter((listItem) => listItem.id === listItemID)[0] || null;
  }
  getPropertyByID(properties, propertyID) {
    return properties.filter((property) => property.id === propertyID)[0] || null;
  }
  hasEmptyListItem() {
    return this.state.listItems.some((listItem) => listItem.propertyID === null);
  }
  createProperty(listItemID, property) {
    // Добавляем свойство и указываем его в элементе списка:
    // Варианты:
    // 1) listItem найден, но не содержит propertyID. Добавляем propertyID в
    //    listItem, добавляем property в список свойств.
    // 2) listItem найден и уже содержит propertyID. Удаляем property, id которого
    //    указан в propertyID если свойство не существовало изначально. Устанавливаем
    //    новый propertyID, добавляем property в список свойств.
    let listItem = this.getListItemByID(this.state.listItems, listItemID),
        newProperties = this.state.properties.concat(property);

    if (listItem.propertyID) {
      let isPropertyExistsOriginally = this.getPropertyByID(this.props.properties, listItem.propertyID);

      if (!isPropertyExistsOriginally) {
        newProperties = newProperties.filter((prop) =>
          prop.id !== listItem.propertyID
        );
      }
    }

    let newListItems = this.state.listItems.map((item) =>
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
    let newListItem = this.getListItemByID(this.state.listItems, listItemID),
        newProperty = this.getPropertyByID(this.state.properties, property.id),
        newProperties = this.state.properties;

    if (newListItem.propertyID) {
      let isPropertyExistsOriginally = this.getPropertyByID(this.props.properties, newListItem.propertyID);

      if (!isPropertyExistsOriginally) {
        newProperties = newProperties.filter((prop) =>
          prop.id !== newListItem.propertyID
        );
      }
    }

    let newListItems = this.state.listItems.map((item) =>
      item.id === listItemID ? {...item, propertyID: property.id} : item
    );

    this.setState({
      listItems: newListItems,
      properties: newProperties
    });
  }
  updateProperty(listItemID, property) {
    let newListItem = this.getListItemByID(this.state.listItems, listItemID),
        newProperty = this.getPropertyByID(this.state.properties, property.id);

    let newProperties;
    if (newProperty) {
      newProperties = this.state.properties.map((prop) =>
        prop.id === property.id ? property : prop
      );
    } else {
      newProperties = this.state.properties.concat(property);
    }

    let newListItems;
    if (newListItem) {
      newListItems = this.state.listItems.map((item) =>
        item.id === listItemID ? {...newListItem, propertyID: property.id} : item
      );
    } else {
      newListItems = this.state.listItems.concat({
        id: uuid.v4(),
        propertyID: property.id,
        propertyFixed: false
      });
    }

    this.setState({
      listItems: newListItems,
      properties: newProperties
    });
  }
  deleteProperty(listItemID) {
    let listItem = this.getListItemByID(this.state.listItems, listItemID),
        property, isPropertyExistsOriginally;

    if (listItem) {
      property = this.getPropertyByID(this.state.properties, listItem.propertyID);
    }
    if (property) {
      isPropertyExistsOriginally = this.getPropertyByID(this.props.properties, property.id)
    }

    if (isPropertyExistsOriginally) {
      this.setState({
        properties: this.state.properties.map((prop) =>
          prop.id === property.id ? {...prop, value: null} : prop
        ),
        listItems: this.state.listItems.map((item) =>
          item.id === listItemID ? {...item, propertyID: null} : item
        )
      });
    } else {
      this.setState({
        properties: this.state.properties.filter((prop) => prop.id !== property.id),
        listItems: this.state.listItems.map((item) =>
          item.id === listItemID ? {...item, propertyID: null} : item
        )
      });
    }
  }
  addListItem() {
    if (!this.hasEmptyListItem()) {
      let newListItems = this.state.listItems
        .map((item) =>
          !item.propertyFixed ? {...item, propertyFixed: true} : item
        )
        .concat({
          id: uuid.v4(),
          propertyID: null,
          propertyFixed: false
        });

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
    let listItem = this.getListItemByID(this.state.listItems, listItemID),
        property, isPropertyExistsOriginally;

    if (listItem) {
      property = this.getPropertyByID(this.state.properties, listItem.propertyID);
    }
    if (property) {
      isPropertyExistsOriginally = this.getPropertyByID(this.props.properties, property.id)
    }

    if (isPropertyExistsOriginally) {
      this.setState({
        listItems: this.state.listItems.filter((item) => item.id !== listItemID),
        properties: this.state.properties.map((prop) =>
          prop.id === property.id ? {...prop, value: null} : prop
        )
      });
    } else {
      this.setState({
        listItems: this.state.listItems.filter((item) => item.id !== listItemID),
        properties: this.state.properties.filter((prop) => prop.id !== property.id)
      });
    }
  }
}