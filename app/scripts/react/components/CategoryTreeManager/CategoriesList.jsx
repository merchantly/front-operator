import React, { PropTypes } from 'react';
import JsTree from '../common/JsTree';

export default class CategoriesList {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    onChangeSelection: PropTypes.func.isRequired,
    selectedCategories: PropTypes.array,
  }
  render() {
    const { categories, onChangeSelection, selectedCategories } = this.props;

    const jsTreeConfig = {
      core: {
        animation: 0,
        data: this.unfoldRootCategories(categories),
        multiple: true,
      },
      checkbox: {
        cascade: '',
        three_state: false,
        visible: false,
      },
      plugins: ['checkbox'],
    };

    return (
      <JsTree
        data={jsTreeConfig}
        onChangeSelection={this.props.onChangeSelection}
        selected={selectedCategories}
      />
    );
  }
  unfoldRootCategories(categories) {
    return categories.map((el) => (
      el.children
        ? { ...el, state: { ...el.state, opened: true } }
        : el
    ));
  }
}