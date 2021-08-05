import React, { Component, PropTypes } from 'react';
import SelectedCategories from './SelectedCategories';
import CategoryTreeManager from '../CategoryTreeManager';

class CategoryTreeSelector extends Component {
  getSelectedCategories(categories, selected) {
    return categories.reduce((acc, el) => {
      if (el.children instanceof Array && el.children.length) {
        return (selected.indexOf(el.id) > -1)
          ? [ ...acc, el, ...this.getSelectedCategories(el.children, selected) ]
          : [ ...acc, ...this.getSelectedCategories(el.children, selected) ];
      }

      return (selected.indexOf(el.id) > -1) ? [ ...acc, el ] : acc;
    }, []);
  }
  render() {
    const { categories, onCategoryRemove, selectedCategories, selectedUncommitted } = this.props;

    return (
      <div>
        <SelectedCategories
          {...this.props}
          categories={this.getSelectedCategories(categories, selectedCategories)}
          onRemove={onCategoryRemove}
        />
        <CategoryTreeManager
          {...this.props}
          selectedCategories={selectedUncommitted}
        />
      </div>
    );
  }
}

CategoryTreeSelector.propTypes = {
  canCreate: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  createButtonTitle: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  modalCreateTitle: PropTypes.string.isRequired,
  modalShowTitle: PropTypes.string.isRequired,
  modalUuid: PropTypes.string.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  selectedUncommitted: PropTypes.array.isRequired,
  onCategoriesChange: PropTypes.func.isRequired,
  onCategoryRemove: PropTypes.func.isRequired,
  onSelectionAccept: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  onSelectionDiscard: PropTypes.func.isRequired,
  parentCategoryText: PropTypes.string,
  nameText: PropTypes.string,
};

export default CategoryTreeSelector;
