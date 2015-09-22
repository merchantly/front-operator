/*eslint camelcase: 0 */
import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import SelectedCategories from './SelectedCategories';
import CategoryTreeManager from '../CategoryTreeManager';

export default class CategoryTreeSelector extends Component {
  static propTypes = {
    canCreate: PropTypes.bool,
    categories_ids: PropTypes.arrayOf(PropTypes.number),
    createButtonTitle: PropTypes.string,
    data: PropTypes.array,
    fieldName: PropTypes.string,
    modalCreateTitle: PropTypes.string,
    modalShowTitle: PropTypes.string,
  }
  static defaultProps = {
    categories_ids: [],
    canCreate: false,
    createButtonTitle: 'Создать',
    data: [],
    fieldName: 'categories_ids[]',
    modalCreateTitle: 'Создание категории',
    modalShowTitle: 'Выбор категорий',
  }
  state = {
    categories: [],
    modalUuid: void 0,
    selectedCategories: [],
    selectedUncommitted: [],
  }
  componentWillMount() {
    const { categories_ids, data } = this.props;

    this.setState({
      categories: data,
      modalUuid: uuid.v4(),
      selectedCategories: categories_ids,
      selectedUncommitted: categories_ids,
    });
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
    const filteredCategories = this.state.selectedCategories.filter((id) => id !== categoryId);

    this.setState({
      selectedCategories: filteredCategories,
      selectedUncommitted: filteredCategories,
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