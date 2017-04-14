import React, { PropTypes, Component } from 'react';
import JsTree from '../common/JsTree';

class CategoriesList extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
    selectedCategories: PropTypes.array,
  }
  render() {
    const { categories, onSelectionChange, selectedCategories } = this.props;

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
        onSelectionChange={this.props.onSelectionChange}
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
