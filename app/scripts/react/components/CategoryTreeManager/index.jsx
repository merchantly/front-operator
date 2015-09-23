import React, { PropTypes, Component } from 'react';
import Api from '../../api';
import NoticeService from '../../services/Notice';
import CategoriesList from './CategoriesList';
import CategoryCreateForm from './CategoryCreateForm';
import Modal from '../common/Modal';

const MANAGER_CREATE = 'MANAGER_CREATE';
const MANAGER_CREATING = 'MANAGER_CREATING';
const MANAGER_SHOW = 'MANAGER_SHOW';

export default class CategoryTreeManager extends Component {
  static propTypes = {
    canCreate: PropTypes.bool,
    categories: PropTypes.array.isRequired,
    createButtonTitle: PropTypes.string.isRequired,
    modalUuid: PropTypes.string.isRequired,
    modalCreateTitle: PropTypes.string.isRequired,
    modalShowTitle: PropTypes.string.isRequired,
    onAcceptSelection: PropTypes.func.isRequired,
    onCategoriesChange: PropTypes.func.isRequired,
    onChangeSelection: PropTypes.func.isRequired,
    onDiscardSelection: PropTypes.func.isRequired,
    selectedCategories: PropTypes.array,
  }
  state = {
    currentState: MANAGER_SHOW,
    category: this.getDefaultCategory(),
  }
  getDefaultCategory() {
    return { name: '' };
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
    const { categories, onCategoriesChange, selectedCategories } = this.props;
    const { category } = this.state;
    const parentCategory = this.getParent(categories, selectedCategories);

    this.activateCreating();

    Api.categories.create({
      name: category.name,
      parentID: parentCategory.id,
    }).done((category) => {
      let newCategories = this.addCategory(categories, parentCategory.id, {
        id: category.id,
        text: category.name,
        children: [],
      });

      onCategoriesChange(newCategories);
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
    this.props.onAcceptSelection();
  }
  discardSelection() {
    this.activateShow();
    this.props.onDiscardSelection();
  }
  onFieldChange(fieldName, value) {
    this.setState({
      category: { ...this.state.data, [fieldName]: value }
    });
  }
  render() {
    const {
      categories, createButtonTitle, modalCreateTitle, modalShowTitle,
      modalUuid, onChangeSelection, selectedCategories
    } = this.props;
    const { category, currentState } = this.state;
    const parentCategory = this.getParent(categories, selectedCategories);
    const modalOptions = {
      cancelClosesModal: true,
      onClose: this.discardSelection.bind(this),
      uuid: modalUuid,
    }

    switch(currentState) {
      case MANAGER_CREATE:
        return (
          <Modal
            {...modalOptions}
            onOk={this.createCategory.bind(this)}
            textButtonOk={createButtonTitle}
            textButtonCancel="Отмена"
            title={modalCreateTitle}
          >
            <CategoryCreateForm
              category={category}
              parentCategory={parentCategory}
              onFieldChange={this.onFieldChange.bind(this)}
            />
          </Modal>
        );
      case MANAGER_CREATING:
        return (
          <Modal
            {...modalOptions}
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
              onChangeSelection={onChangeSelection}
              selectedCategories={selectedCategories}
            />
          </Modal>
        );
      default:
        return null;
    }
  }
}