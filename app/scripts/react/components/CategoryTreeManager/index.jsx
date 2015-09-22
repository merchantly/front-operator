import React, { PropTypes, Component } from 'react';
import CategoriesList from './CategoriesList';
import CategoryCreateForm from './CategoryCreateForm';
import Modal from '../common/Modal';

const MANAGER_CREATE = 'MANAGER_CREATE';
const MANAGER_SHOW = 'MANAGER_SHOW';

export default class CategoryTreeManager extends Component {
  static propTypes = {
    canCreate: PropTypes.bool,
    categories: PropTypes.array.isRequired,
    modalUuid: PropTypes.string.isRequired,
    modalCreateTitle: PropTypes.string.isRequired,
    modalShowTitle: PropTypes.string.isRequired,
    parentCategory: PropTypes.object,
    onAcceptSelection: PropTypes.func.isRequired,
    onChangeSelection: PropTypes.func.isRequired,
    onDiscardSelection: PropTypes.func.isRequired,
    selectedCategories: PropTypes.array,
  }
  state = {
    currentState: MANAGER_SHOW,
  }
  render() {
    const { modalUuid, onAcceptSelection, onDiscardSelection } = this.props;
    const { currentState } = this.state;

    return (
      <Modal
        headerButtons={this.getHeaderButtons.call(this)}
        okClosesModal={true}
        onClose={this.onModalClose.bind(this)}
        onOk={this.onModalOk.bind(this)}
        textButtonCancel={null}
        title={this.getModalTitle(currentState)}
        uuid={modalUuid}
      >
        {this.renderContent.call(this)}
      </Modal>
    );
  }
  renderContent() {
    const { categories, onChangeSelection, selectedCategories } = this.props;
    const { currentState } = this.state;

    switch(this.state.currentState) {
      case MANAGER_CREATE:
        return (
          <CategoryCreateForm categories={categories} />
        );
      case MANAGER_SHOW:
        return (
          <CategoriesList
            categories={categories}
            onChangeSelection={onChangeSelection}
            selectedCategories={selectedCategories}
          />
        );
      default: return null;
    }
  }
  switchOnCreateState() {
    this.setState({ currentState: MANAGER_CREATE });
  }
  switchOnShowState() {
    this.setState({ currentState: MANAGER_SHOW });
  }
  getModalTitle(currentState) {
    const { modalCreateTitle, modalShowTitle } = this.props;

    switch(currentState) {
      case MANAGER_CREATE: return modalCreateTitle;
      case MANAGER_SHOW: return modalShowTitle;
      default: return '';
    }
  }
  getHeaderButtons() {
    const { createButtonTitle, canCreate } = this.props;
    const { currentState } = this.state;

    return (
      <span>
        {canCreate
         && currentState !== MANAGER_CREATE
         && <Button
              bsStyle="primary"
              className="btn-sm"
              onClick={this.switchOnCreateState.bind(this)}
            >
              {createButtonTitle}
            </Button>
        }
      </span>
    );
  }
  onModalOk() {
    this.setState({ currentState: MANAGER_SHOW });
    this.props.onAcceptSelection();
  }
  onModalClose() {
    this.setState({ currentState: MANAGER_SHOW });
    this.props.onDiscardSelection();
  }
}