import React, { PropTypes } from 'react';
import HiddenInput from '../common/HiddenInput';
import SelectedCategoryItem from './SelectedCategoryItem';

export default function SelectedCategories(props) {
  SelectedCategories.propTypes = {
    categories: PropTypes.array.isRequired,
    fieldName: PropTypes.string.isRequired,
    modalUuid: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  return ({
    props,

    onRemove(categoryId) {
      this.props.onRemove(categoryId);
    },

    render() {
      const { categories, fieldName, modalUuid } = this.props;

      return (
        <div>
          <ul className="category-tree-selector__selected__list list-inline">
            {
              categories.map((category, idx) => (
                <SelectedCategoryItem
                  category={category}
                  key={`list-item-${idx}`}
                  onRemove={this.onRemove.bind(this)}
                />
              ))
            }
            <li className="category-tree-selector__selected__add">
              <a data-target={`#${modalUuid}`} data-toggle="modal" href="#">
                <i className="fa fa-plus-circle fa-lg" />
              </a>
            </li>
          </ul>
          {
            categories.length
              ? categories.map(({ id }, idx) => (
                  <HiddenInput
                    key={`category-input-${idx}`}
                    name={fieldName}
                    value={id}
                  />
                ))
              : <HiddenInput
                  name={fieldName}
                  value={null}
                />
          }
        </div>
      );
    },
  });
}