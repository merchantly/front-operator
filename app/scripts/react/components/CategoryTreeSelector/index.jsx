/*eslint camelcase: 0 */
import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import SelectedCategories from './SelectedCategories';
import CategoryTreeManager from '../CategoryTreeManager';

export default class CategoryTreeSelector extends Component {
  static defaultProps = {
    categories_ids: [],
    canCreate: false,
    createButtonTitle: 'Создать',
    data: [{
      "id": 560,
      "text": "Hello!asdsadd22",
      "children": [{
        "id": 3399,
        "text": "New noded",
        "children": []
      }, {
        "id": 3149,
        "text": "New node",
        "children": [{
          "id": 3153,
          "text": "New node",
          "children": []
        }]
      }]
    }],
    fieldName: 'categories_ids[]',
    modalCreateTitle: 'Создание категории',
    modalShowTitle: 'Выбор категорий',
  }
  state = {
    categories: this.props.data,
    modalUuid: uuid.v4(),
    selectedCategories: this.props.categories_ids,
    selectedUncommitted: this.props.categories_ids,
  }
  getSelectedCategories(categories, selected) {
    return categories.reduce((acc, el) => {
      if (el.children instanceof Array && el.children.length) {
        return (selected.indexOf(el.id) > -1)
          ? [ ...acc, el, ...this.getSelectedCategories(el.children, selected) ]
          : [ ...acc, ...this.getSelectedCategories(el.children, selected) ];
      } else {
        return (selected.indexOf(el.id) > -1) ? [ ...acc, el ] : acc;
      }
    }, []);
  }
  onRemove(categoryId) {
    const { selectedCategories } = this.state;
    const newCategories = selectedCategories.filter((id) => id !== categoryId);

    this.setState({
      selectedCategories: newCategories,
      selectedUncommitted: newCategories,
    });
  }
  onAcceptSelection() {
    this.setState({ selectedCategories: this.state.selectedUncommitted });
  }
  onChangeSelection(selected) {
    this.setState({ selectedUncommitted: selected });
  }
  onDiscardSelection() {
    this.setState({ selectedUncommitted: this.state.selectedCategories });
  }
  render() {
    const { categories, modalUuid, selectedCategories, selectedUncommitted } = this.state;
    const { createButtonTitle, canCreate, fieldName, modalCreateTitle, modalShowTitle } = this.props;

    return (
      <div>
        <SelectedCategories
          categories={this.getSelectedCategories(categories, selectedCategories)}
          fieldName={fieldName}
          modalUuid={modalUuid}
          onRemove={this.onRemove.bind(this)}
        />
        <CategoryTreeManager
          canCreate={canCreate}
          categories={categories}
          createButtonTitle={createButtonTitle}
          modalUuid={modalUuid}
          modalCreateTitle={modalCreateTitle}
          modalShowTitle={modalShowTitle}
          onAcceptSelection={this.onAcceptSelection.bind(this)}
          onChangeSelection={this.onChangeSelection.bind(this)}
          onDiscardSelection={this.onDiscardSelection.bind(this)}
          selectedCategories={selectedUncommitted}
        />
      </div>
    );
  }
}