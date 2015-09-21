/*eslint camelcase: 0 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import uuid from 'uuid';
import Modal from '../common/Modal';
import JsTree from '../common/JsTree';
import SelectedCategories from './SelectedCategories';

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
    editedCategory: void 0,
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
  addCategory(categories, parentID, data) {
    return categories.map((el) => {
      if (el.id === parentID) {
        return {
          ...el,
          children: [ data, ...el.children ]
        };
      } else if (el.children instanceof Array && el.children.length) {
        return {
          ...el,
          children: this.addCategory(el.children, parentID, data)
        };
      } else {
        return el;
      }
    });
  }
  updateCategory(categories, categoryID, data) {
    return categories.map((el) => {
      if (el.id === categoryID) {
        return { ...el, ...data };
      } else if (el.children instanceof Array && el.children.length) {
        return {
          ...el,
          children: this.updateCategory(el.children, categoryID, data)
        };
      } else {
        return el;
      }
    });
  }
  removeCategory(categories, categoryID) {
    return categories.reduce((acc, el) => {
      if (el.id === categoryID) {
        return acc;
      } else if (el.children instanceof Array && el.children.length) {
        return [...acc, {
          ...el,
          children: this.removeCategory(el.children, categoryID)
        }];
      } else {
        return [ ...acc, el ];
      }
    }, []);
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
  unfoldRootCategories(categories) {
    return categories.map((el) => (
      el.children
        ? { ...el, state: { ...el.state, opened: true } }
        : el
    ));
  }
  onChangeSelection(selected) {
    this.setState({ selectedUncommitted: selected });
  }
  onNodeCreate(node) {
    let { categories: newCategories } = this.state;
    const { children, parent, text } = node;
    const parentID = parseInt(parent, 10);
    const data = { children, text, id: uuid.v4() };

    newCategories = this.addCategory(newCategories, parentID, data);
    this.setState({
      categories: newCategories,
      editedCategory: data.id,
    });
  }
  onNodeRename(node, isCancelled) {
    const { id, parent, text: newValue, original: { text: oldValue } } = node;
    const nodeID = /[a-z]/g.test(node.id) ? node.id : parseInt(node.id, 10);
    const parentID = parseInt(parent, 10);

    if (typeof nodeID === 'string') {
      let { categories: newCategories } = this.state;

      if (oldValue === newValue && isCancelled) {
        newCategories = this.removeCategory(newCategories, nodeID);
      } else {
        newCategories = this.updateCategory(newCategories, nodeID, { text: newValue });

        window.Requester.request({
          url: ApiRoutes.operatorCategories(),
          method: 'POST',
          data: {
            name: newValue,
            parent_id: parentID
          }
        }).done((category) => {
          newCategories = this.updateCategory(newCategories, nodeID, {
            id: category.id,
            text: category.name
          });

          this.setState({ categories: newCategories });
        }).fail((jqXHR) => {
          newCategories = this.removeCategory(newCategories, nodeID);

          window.alert(jqXHR.responseText);
          this.setState({ categories: newCategories });
        });
      }

      this.setState({
        categories: newCategories,
        editedCategory: void 0,
      });
    } else {
      let { categories: newCategories } = this.state;

      if (oldValue !== newValue && !isCancelled) {
        newCategories = this.updateCategory(newCategories, nodeID, { text: newValue });

        window.Requester.request({
          url: ApiRoutes.operatorCategoriesID(nodeID),
          method: 'PUT',
          data: { name: newValue }
        }).done((category) => {
          newCategories = this.updateCategory(newCategories, nodeID, {
            id: category.id,
            text: category.name
          });

          this.setState({ categories: newCategories });
        }).fail((jqXHR) => {
          newCategories = this.updateCategory(newCategories, nodeID, { text: oldValue });

          window.alert(jqXHR.responseText);
          this.setState({ categories: newCategories });
        });
      }

      this.setState({
        categories: newCategories,
        editedCategory: void 0,
      });
    }
  }
  onRemove(categoryId) {
    const filteredCategories = this.state.selectedCategories.filter((id) => id !== categoryId);

    this.setState({
      selectedCategories: filteredCategories,
      selectedUncommitted: filteredCategories,
    });
  }
  onModalClose() {
    this.setState({ selectedUncommitted: this.state.selectedCategories });
  }
  onModalOk() {
    const { selectedUncommitted } = this.state;

    this.setState({ selectedCategories: selectedUncommitted });
  }
  render() {
    const {
      categories, editedCategory, modalUuid, selectedCategories, selectedUncommitted
    } = this.state;
    const {
      canCreate, canDelete, canRename, createButtonTitle, deleteButtonTitle,
      fieldName, modalTitle, renameButtonTitle
    } = this.props;

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

    const modalClasses = classNames({
      'modal--categories-with-buttons': canCreate || canDelete || canRename
    });

    return (
      <div>
        <SelectedCategories
          categories={this.getSelectedCategories(categories, selectedCategories)}
          fieldName={fieldName}
          modalUuid={modalUuid}
          onRemove={this.onRemove.bind(this)}
        />
        <Modal
          className={modalClasses}
          fitWindow={true}
          okClosesModal={true}
          onClose={this.onModalClose.bind(this)}
          onOk={this.onModalOk.bind(this)}
          ref="modal"
          textButtonCancel={null}
          title={modalTitle}
          uuid={modalUuid}
        >
          <JsTree
            canCreate={canCreate}
            canDelete={canDelete}
            canRename={canRename}
            createButtonTitle={createButtonTitle}
            data={jsTreeConfig}
            deleteButtonTitle={deleteButtonTitle}
            edited={editedCategory}
            newNodeText={'Новая категория'}
            nodeCreate={true}
            nodeRename={true}
            onChangeSelection={this.onChangeSelection.bind(this)}
            onNodeCreate={this.onNodeCreate.bind(this)}
            onNodeRename={this.onNodeRename.bind(this)}
            renameButtonTitle={renameButtonTitle}
            selected={selectedUncommitted}
          />
        </Modal>
      </div>
    );
  }
}