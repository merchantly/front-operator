/*eslint camelcase: 0 */
import React, { Component, PropTypes } from 'react';
import Modal from '../common/Modal';
import JsTree from '../common/JsTree';
import generateUuid from '../../utils/generateUUID';
import SelectedCategories from './SelectedCategories';

export default class CategoryTreeSelector extends Component {
  static propTypes = {
    categories_ids: PropTypes.arrayOf(PropTypes.number),
    data: PropTypes.array,
  }
  static defaultProps = {
    categories_id: [],
    data: [],
  }
  state = {
    modalUuid: void 0,
    categories: [],
    selectedCategories: [],
  }
  componentWillMount() {
    const { categories_ids, data } = this.props;
    
    this.setState({
      categories: data,
      modalUuid: generateUuid(),
      selectedCategories: categories_ids,
      selectedUncommited: categories_ids,
    });
  }
  getSelectedCategories(categories, selected) {
    return categories.reduce((acc, el) => {
      if (el.children instanceof Array && el.children.length) {
        return (selected.indexOf(el.id) > -1)
          ? [ ...acc, el, ...this.getSelectedCategories(el.children, selected) ]
          : this.getSelectedCategories(el.children, selected);
      } else {
        return (selected.indexOf(el.id) > -1) ? [ ...acc, el ] : acc;
      }
    }, []);
  }
  onChangeTree(selected) {
    this.setState({ selectedUncommited: selected });
  }
  onRemove(categoryId) {
    const filteredCategories = this.state.selectedCategories.filter((id) => id !== categoryId);

    this.setState({
      selectedCategories: filteredCategories,
      selectedUncommited: filteredCategories,
    });
  }
  onModalClose() {
    this.setState({ selectedUncommited: this.state.selectedCategories });
  }
  onModalOk() {
    const { selectedUncommited } = this.state;

    this.setState({ selectedCategories: selectedUncommited });
  }
  render() {
    const { categories, modalUuid, selectedCategories, selectedUncommited } = this.state;
    
    return (
      <div>
        <SelectedCategories
          categories={this.getSelectedCategories(categories, selectedCategories)}
          modalUuid={modalUuid}
          onRemove={this.onRemove.bind(this)}
        />
        <Modal
          ref="modal"
          onClose={this.onModalClose.bind(this)}
          onOk={this.onModalOk.bind(this)}
          okClosesModal={true}
          textButtonCancel={null}
          title="Выбор категорий"
          uuid={modalUuid}
        >
          <JsTree
            data={{ core: { multiple: true, data: categories } }}
            onChange={this.onChangeTree.bind(this)}
            selected={selectedUncommited}
          />
        </Modal>
      </div>
    );
  }  
}
