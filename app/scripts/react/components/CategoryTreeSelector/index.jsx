/*eslint camelcase: 0 */
import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import Modal from '../common/Modal';
import JsTree from '../common/JsTree';
import SelectedCategories from './SelectedCategories';

export default class CategoryTreeSelector extends Component {
  static propTypes = {
    categories_ids: PropTypes.arrayOf(PropTypes.number),
    data: PropTypes.array,
    fieldName: PropTypes.string,
    modalTitle: PropTypes.string,
  }
  static defaultProps = {
    categories_ids: [],
    data: [],
    fieldName: 'categories_ids[]',
    modalTitle: 'Выбор категорий',
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
      modalUuid: uuid.v4(),
      selectedCategories: categories_ids,
      selectedUncommitted: categories_ids,
    });
  }
  createCategory(categories, parentID, data) {
    let newCategories = this.addCategory(categories, parentID, data);

    window.Requester.request({
      url: ApiRoutes.operatorCategories(),
      method: 'POST',
      data: {
        name: data.text,
        parent_id: parentID,
      }
    }).done((category) => {
        newCategories = this.updateCategory(newCategories, data.id, {
          id: category.id,
          text: category.name,
          children: data.children,
        });

        this.setState({ categories: newCategories });
      })
      .fail((jq) => {
        newCategories = this.removeCategory(newCategories, data.id);

        window.alert(jq.responseText);
        this.setState({ categories: newCategories });
      });

    this.setState({ categories: newCategories });
  }
  renameCategory(categories, categoryID, data) {
    let newCategories = this.updateCategory(categories, categoryID, {
      text: data.newValue
    });

    window.Requester.request({
      url: ApiRoutes.operatorCategoriesID(categoryID),
      method: 'PUT',
      data: { name: data.newValue }
    }).done((category) => {
        newCategories = this.updateCategory(newCategories, categoryID, {
          id: category.id,
          text: category.name,
        });

        this.setState({ categories: newCategories });
      })
      .fail((jq) => {
        newCategories = this.updateCategory(newCategories, categoryID, {
          text: data.oldValue,
        });

        window.alert(jq.responseText);
        this.setState({ categories: newCategories });
      });

    this.setState({ categories: newCategories });
  }
  addCategory(categories, parentID, data) {
    return categories.map((el) => {
      if (el.id === parentID) {
        return {
          ...el,
          children: [ ...el.children, data ]
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
  onChangeTree(evType, node) {
    switch(evType) {
      case 'create_node':
        this.createCategory(this.state.categories, parseInt(node.parent, 10), {
          id: uuid.v4(),
          text: node.text,
          children: node.children,
        });
        break;
      case 'rename_node':
        this.renameCategory(this.state.categories, parseInt(node.id, 10), {
          oldValue: node.original.text,
          newValue: node.text,
        });
        break;
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
    const { categories, modalUuid, selectedCategories, selectedUncommitted } = this.state;
    const { fieldName, modalTitle } = this.props;

    const jsTreeConfig = {
      core: {
        animation: 0,
        data: this.unfoldRootCategories(categories),
        multiple: true,
      },
      checkbox: {
        cascade: 'up',
        three_state: false,
        visible: false,
      },
      plugins: ['checkbox'],
    };

    return (
      <div>
        <SelectedCategories
          categories={this.getSelectedCategories(categories, selectedCategories)}
          fieldName={fieldName}
          modalUuid={modalUuid}
          onRemove={this.onRemove.bind(this)}
        />
        <Modal
          okClosesModal={true}
          onClose={this.onModalClose.bind(this)}
          onOk={this.onModalOk.bind(this)}
          ref="modal"
          textButtonCancel={null}
          title={modalTitle}
          uuid={modalUuid}
        >
          <JsTree
            data={jsTreeConfig}
            nodeCreate={true}
            nodeRename={true}
            onChangeSelection={this.onChangeSelection.bind(this)}
            onChangeTree={this.onChangeTree.bind(this)}
            selected={selectedUncommitted}
          />
        </Modal>
      </div>
    );
  }
}