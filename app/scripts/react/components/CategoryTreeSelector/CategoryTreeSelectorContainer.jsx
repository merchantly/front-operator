import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import CategoryTreeSelector from './CategoryTreeSelector';

class CategoryTreeSelectorContainer extends Component {
  constructor(props) {
    super(props);
    this.acceptSelection = this.acceptSelection.bind(this);
    this.changeCategories = this.changeCategories.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
    this.discardSelection = this.discardSelection.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
  }
  state = {
    categories: this.props.data,
    modalUuid: uuid.v4(),
    selectedCategories: this.props.category_ids,
    selectedUncommitted: this.props.category_ids,
  }
  acceptSelection() {
    this.setState({ selectedCategories: this.state.selectedUncommitted });
  }
  changeCategories(categories) {
    this.setState({ categories });
  }
  changeSelection(selected) {
    this.setState({ selectedUncommitted: selected });
  }
  discardSelection() {
    this.setState({ selectedUncommitted: this.state.selectedCategories });
  }
  removeCategory(categoryId) {
    const newCategories = this.state.selectedCategories.filter(
      (id) => id !== categoryId
    );

    this.setState({
      selectedCategories: newCategories,
      selectedUncommitted: newCategories,
    });
  }
  render() {
    return (
      <CategoryTreeSelector
        {...this.props}
        {...this.state}
        onCategoriesChange={this.changeCategories}
        onCategoryRemove={this.removeCategory}
        onSelectionAccept={this.acceptSelection}
        onSelectionChange={this.changeSelection}
        onSelectionDiscard={this.discardSelection}
      />
    );
  }
}

CategoryTreeSelectorContainer.propTypes = {
  category_ids: PropTypes.array.isRequired,
  canCreate: PropTypes.bool,
  createButtonTitle: PropTypes.string,
  data: PropTypes.array.isRequired,
  fieldName: PropTypes.string.isRequired,
  modalCreateTitle: PropTypes.string,
  modalShowTitle: PropTypes.string,
};
CategoryTreeSelectorContainer.defaultProps = {
  'fieldName': 'product[category_ids][]',
  'data': [
    {
      'id': 560,
      'text': 'Hello!asdsadd22',
      'children': []
    }
  ],
  'canCreate': true,
  'canRename': true,
  'canDelete': true,
  'category_ids': [
    3466
  ],
  'createButtonTitle': 'Создать',
  'modalCreateTitle': 'Создание категории',
  'modalShowTitle': 'Выбор категорий'
};

export default CategoryTreeSelectorContainer;
