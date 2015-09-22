/*eslint camelcase: 0 */
import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import SelectedCategories from './SelectedCategories';
import CategoryTreeManager from '../CategoryTreeManager';

export default class CategoryTreeSelector extends Component {
  static propTypes = {
    canCreate: PropTypes.bool,
    canDelete: PropTypes.bool,
    canRename: PropTypes.bool,
    categories_ids: PropTypes.arrayOf(PropTypes.number),
    createButtonTitle: PropTypes.string,
    data: PropTypes.array,
    deleteButtonTitle: PropTypes.string,
    fieldName: PropTypes.string,
    modalTitle: PropTypes.string,
    renameButtonTitle: PropTypes.string,
  }
  static defaultProps = {
    categories_ids: [],
    canCreate: false,
    canDelete: false,
    canRename: false,
    createButtonTitle: 'Создать',
    data: [],
    deleteButtonTitle: 'Удалить',
    fieldName: 'categories_ids[]',
    modalTitle: 'Выбор категорий',
    renameButtonTitle: 'Переименовать',
  }
  state = {
    categories: [],
    modalUuid: void 0,
    selectedCategories: [],
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
    const { fieldName, canCreate } = this.props;

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
          modalUuid={modalUuid}
          onAcceptSelection={this.onAcceptSelection.bind(this)}
          onChangeSelection={this.onChangeSelection.bind(this)}
          selectedCategories={selectedUncommitted}
        />
      </div>
    );
  }
}