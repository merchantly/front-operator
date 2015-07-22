import React, { Component, PropTypes } from 'react';
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
    return (
      <div>
        <PropertyList
          properties={this.getSelectedProperties()}
          onPropertyUpdate={this.updateProperty.bind(this)}
          onPropertyDelete={this.deleteProperty.bind(this)}
        />
        <div className="p-t-xxs p-b-xxs">
          <div className="hr-line-dashed" />
          <PropertyCreator
            properties={this.getUnselectedProperties()}
            onPropertyAdd={this.addProperty.bind(this)}
          />
        </div>
      </div>
    );
  }

                  // .form-horizontal
                  //   .form-group.m-b
                  //     %label.control-label.col-sm-5.col-md-4.col-lg-3
                  //       Наличие манометра
                  //       %span.tip-trigger{data: {container: 'body', toggle: 'popover', placement: 'right', content: 'Тип: строковый'}
                  //         %i.fa.fa-question-circle
                  //     .col-sm-7.col-md-8.col-lg-9
                  //       %textarea.form-control
                  //   .form-group.m-b
                  //     %label.control-label.col-sm-5.col-md-4.col-lg-3
                  //       Скорость
                  //       %span.tip-trigger{data: {container: 'body', toggle: 'popover', placement: 'right', content: 'Тип: строковый'}
                  //         %i.fa.fa-question-circle
                  //     .col-sm-7.col-md-8.col-lg-9
                  //       %select.form-control{ks-select2: true}
                  //         %option{value: '20'} 20 км/ч
                  //         %option{value: '40'} 40 км/ч
                  //   .form-group.m-b
                  //     %label.control-label.col-sm-5.col-md-4.col-lg-3
                  //       Высота рамы
                  //       %span.tip-trigger{data: {container: 'body', toggle: 'popover', placement: 'right', content: 'Тип: строковый'}
                  //         %i.fa.fa-question-circle
                  //     .col-sm-7.col-md-8.col-lg-9
                  //       %input.form-control{type: 'text'}
                  //   .row
                  //     .col-md-8.col-md-offset-4.col-lg-9.col-lg-offset-3
                  //       %button.btn.btn-default.btn-outline.btn-rounded.btn-sm.m-t-xs.m-r-sm Показать все 45 характеристик
                  //       %button.btn.btn-primary.btn-rounded.btn-sm.m-t-xs.active != '<i class="fa fa-plus"></i> Создать характеристику'


  // render() {
  //   return (
  //     <div className="p-b-xxs p-t-xxs">
  //       <PropertyCreator
  //         properties={this.getUnselectedProperties()}
  //         onCreate={this.addProperty.bind(this)}
  //       />
  //       <PropertyList
  //         properties={this.getSelectedProperties()}
  //         onUpdate={this.updateProperty.bind(this)}
  //         onDelete={this.deleteProperty.bind(this)}
  //       />
  //     </div>
  //   );
  // }
  addProperty(property) {
    // Если свойство существует, то просто делаем его выделенным,
    // иначе оно будет добавлено в конце списка
    let properties = this.state.properties;
    const newProperty = {...property, select: true};
    const created = properties.filter((prop) => prop.id === property.id)[0];

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
    let properties = this.state.properties;
    const created = this.props.properties.filter((prop) => prop.id === property.id)[0];

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
  normalizeProperties(properties, customAttributes) {
    let normalizedProperties = [];

    properties.forEach((property) => {
      let selected = customAttributes.filter((attr) => property.id === attr.property_id)[0],
          normalizedProperty;

      if (selected) {
        normalizedProperty = {
          ...property,
          value: selected.value,
          select: true
        }
      } else {
        normalizedProperty = {
          ...property,
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