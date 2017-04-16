import React, { Component, PropTypes } from 'react';
import Api from '../../api';
import NoticeService from '../../services/Notice';
import CategoriesList from './CategoriesList';
import CategoryCreateForm from './CategoryCreateForm';
import Modal from '../common/Modal';

const MANAGER_CREATE = 'MANAGER_CREATE';
const MANAGER_CREATING = 'MANAGER_CREATING';
const MANAGER_SHOW = 'MANAGER_SHOW';

// FIXME: Стандартный компонент модалки нам не очень подходит.
//        Нужна либо модалка "на стероидах", либо свой компонент с элементами
//        модалки, но своим управляемым поведением.

class CategoryTreeManager extends Component {
  state = {
    currentState: MANAGER_SHOW,
    category: this.getDefaultCategory(),
  }
  getDefaultCategory() {
    return { name: '' };
  }
  isCategoryValid(category) {
    if (!category.name) { return false; }
    return true;
  }
  getParent(categories, selectedCategories) {
    function bfs(tree, ret = []) {
      if (tree.length === 0) {
        return ret;
      } else {
        const [f, ...rest] = tree;
        return bfs(rest.concat(f.children || []), [...ret, f]);
      }
    }

    return bfs(categories).filter((el) => (selectedCategories.indexOf(el.id) > -1))[0];
  }
  getHeaderButtons() {
    const { categories, createButtonTitle, canCreate, selectedCategories } = this.props;
    const parentCategory = this.getParent(categories, selectedCategories);

    return (
      <span>
        {canCreate
         && <Button
              bsStyle="primary"
              className="btn-sm"
              disabled={!parentCategory}
              onClick={this.activateCreate.bind(this)}
            >
              {createButtonTitle}
            </Button>
        }
      </span>
    );
  }
  resetCategory() {
    this.setState({ category: this.getDefaultCategory() });
  }
  createCategory() {
    const {
      categories, onCategoriesChange, onSelectionChange, selectedCategories
    } = this.props;
    const { category } = this.state;
    const parentCategory = this.getParent(categories, selectedCategories);

    this.activateCreating();

    Api.categories.create({
      name: category.name,
      parentID: parentCategory.id,
    }).done((category) => {
      const newSelection = selectedCategories
        .filter((selected) => selected !== parentCategory.id)
        .concat([category.id]);
      const newCategories = this.addCategory(categories, parentCategory.id, {
        id: category.id,
        text: category.name,
        children: [],
      });

      onCategoriesChange(newCategories);
      onSelectionChange(newSelection);
      this.activateShow();
      NoticeService.notifySuccess('Категория ' + category.name + ' успешно создана!');
    }).fail((jqXHR) => {
      this.activateCreate();
      NoticeService.errorResponse(jqXHR);
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
  activateShow() {
    this.setState({
      category: this.getDefaultCategory(),
      currentState: MANAGER_SHOW,
    });
  }
  activateCreate() {
    this.setState({ currentState: MANAGER_CREATE });
  }
  activateCreating() {
    this.setState({ currentState: MANAGER_CREATING });
  }
  acceptSelection() {
    this.activateShow();
    this.props.onSelectionAccept();
  }
  discardSelection() {
    this.activateShow();
    this.props.onSelectionDiscard();
  }
  onFieldChange(fieldName, value) {
    this.setState({
      category: { ...this.state.data, [fieldName]: value }
    });
  }
  onFormSubmit() {
    const { category } = this.state;

    if (this.isCategoryValid(category)) {
      this.createCategory();
    }
  }
  render() {
    const {
      categories, createButtonTitle, modalCreateTitle, modalShowTitle,
      modalUuid, onSelectionChange, selectedCategories
    } = this.props;
    const { category, currentState } = this.state;
    const parentCategory = this.getParent(categories, selectedCategories);
    const modalOptions = {
      cancelClosesModal: true,
      uuid: modalUuid,
    }

    switch(currentState) {
      case MANAGER_CREATE:
        return (
          <Modal
            {...modalOptions}
            buttonOkDisabled={!this.isCategoryValid(category)}
            onClose={this.activateShow.bind(this)}
            onOk={this.createCategory.bind(this)}
            textButtonOk={createButtonTitle}
            textButtonCancel="Назад"
            title={modalCreateTitle}
          >
            <CategoryCreateForm
              category={category}
              parentCategory={parentCategory}
              onFieldChange={this.onFieldChange.bind(this)}
              onSubmit={this.onFormSubmit.bind(this)}
            />
          </Modal>
        );
      case MANAGER_CREATING:
        return (
          <Modal
            {...modalOptions}
            onClose={this.discardSelection.bind(this)}
            textButtonOk={null}
            textButtonCancel={null}
            title={modalCreateTitle}
          >
            Создаём...
          </Modal>
        );
      case MANAGER_SHOW:
        return (
          <Modal
            {...modalOptions}
            headerButtons={this.getHeaderButtons()}
            okClosesModal={true}
            onClose={this.discardSelection.bind(this)}
            onOk={this.acceptSelection.bind(this)}
            textButtonCancel={null}
            title={modalShowTitle}
          >
            <CategoriesList
              categories={categories}
              onSelectionChange={onSelectionChange}
              selectedCategories={selectedCategories}
            />
          </Modal>
        );
      default:
          return (<noscript></noscript>);
    }
  }
}

CategoryTreeManager.propTypes = {
  canCreate: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  createButtonTitle: PropTypes.string.isRequired,
  modalCreateTitle: PropTypes.string.isRequired,
  modalShowTitle: PropTypes.string.isRequired,
  modalUuid: PropTypes.string.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  onCategoriesChange: PropTypes.func.isRequired,
  onSelectionAccept: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  onSelectionDiscard: PropTypes.func.isRequired,
};

export default CategoryTreeManager;
