import React, { PropTypes, Component } from 'react';
import Modal from '../common/Modal';
import CategoryCreateForm from './CategoryCreateForm';
import CategoriesList from './CategoriesList';

export default class CategoryTreeManager extends Component {
  static propTypes = {
    canCreate: PropTypes.bool,
    categories: PropTypes.array.isRequired,
    createButtonTitle: PropTypes.string,
    modalUuid: PropTypes.string.isRequired,
    onAcceptSelection: PropTypes.func.isRequired,
    onChangeSelection: PropTypes.func.isRequired,
    onDiscardSelection: PropTypes.func.isRequired,
    selectedCategories: PropTypes.array,
  }
  state = {
    create: false,
  }
  render() {
    const {
      canCreate, categories, createButtonTitle, modalUuid, onChangeSelection, selectedCategories
    } = this.props;

    return (
      <Modal
        headerButtons={this.getHeaderButtons.call(this)}
        okClosesModal={true}
        onClose={this.props.onDiscardSelection}
        onOk={this.props.onAcceptSelection}
        textButtonCancel={null}
        title={this.state.create ? 'Создание категории' : 'Выбор категорий'}
        uuid={modalUuid}
      >
        {this.state.create
           ? <CategoryCreateForm />
           : <CategoriesList
               categories={categories}
               onChangeSelection={onChangeSelection}
               selectedCategories={selectedCategories}
              />
        }
      </Modal>
    );
  }
  getHeaderButtons() {
    return (
      <span>
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={() => { this.setState({ create: true })}}
        >
          Создать
        </button>
      </span>
    );
  }
  // addCategory(categories, parentID, data) {
  //   return categories.map((el) => {
  //     if (el.id === parentID) {
  //       return {
  //         ...el,
  //         children: [ data, ...el.children ]
  //       };
  //     } else if (el.children instanceof Array && el.children.length) {
  //       return {
  //         ...el,
  //         children: this.addCategory(el.children, parentID, data)
  //       };
  //     } else {
  //       return el;
  //     }
  //   });
  // }
  // updateCategory(categories, categoryID, data) {
  //   return categories.map((el) => {
  //     if (el.id === categoryID) {
  //       return { ...el, ...data };
  //     } else if (el.children instanceof Array && el.children.length) {
  //       return {
  //         ...el,
  //         children: this.updateCategory(el.children, categoryID, data)
  //       };
  //     } else {
  //       return el;
  //     }
  //   });
  // }
  // removeCategory(categories, categoryID) {
  //   return categories.reduce((acc, el) => {
  //     if (el.id === categoryID) {
  //       return acc;
  //     } else if (el.children instanceof Array && el.children.length) {
  //       return [...acc, {
  //         ...el,
  //         children: this.removeCategory(el.children, categoryID)
  //       }];
  //     } else {
  //       return [ ...acc, el ];
  //     }
  //   }, []);
  // }
  // onNodeCreate(node) {
  //   let { categories: newCategories } = this.state;
  //   const { children, parent, text } = node;
  //   const parentID = parseInt(parent, 10);
  //   const data = { children, text, id: uuid.v4() };

  //   newCategories = this.addCategory(newCategories, parentID, data);
  //   this.setState({
  //     categories: newCategories,
  //     editedCategory: data.id,
  //   });
  // }
  // onNodeRename(node, isCancelled) {
  //   const { id, parent, text: newValue, original: { text: oldValue } } = node;
  //   const nodeID = /[a-z]/g.test(node.id) ? node.id : parseInt(node.id, 10);
  //   const parentID = parseInt(parent, 10);

  //   if (typeof nodeID === 'string') {
  //     let { categories: newCategories } = this.state;

  //     if (oldValue === newValue && isCancelled) {
  //       newCategories = this.removeCategory(newCategories, nodeID);
  //     } else {
  //       newCategories = this.updateCategory(newCategories, nodeID, { text: newValue });

  //       window.Requester.request({
  //         url: ApiRoutes.operatorCategories(),
  //         method: 'POST',
  //         data: {
  //           name: newValue,
  //           parent_id: parentID
  //         }
  //       }).done((category) => {
  //         newCategories = this.updateCategory(newCategories, nodeID, {
  //           id: category.id,
  //           text: category.name
  //         });

  //         this.setState({ categories: newCategories });
  //       }).fail((jqXHR) => {
  //         newCategories = this.removeCategory(newCategories, nodeID);

  //         window.alert(jqXHR.responseText);
  //         this.setState({ categories: newCategories });
  //       });
  //     }

  //     this.setState({
  //       categories: newCategories,
  //       editedCategory: void 0,
  //     });
  //   } else {
  //     let { categories: newCategories } = this.state;

  //     if (oldValue !== newValue && !isCancelled) {
  //       newCategories = this.updateCategory(newCategories, nodeID, { text: newValue });

  //       window.Requester.request({
  //         url: ApiRoutes.operatorCategoriesID(nodeID),
  //         method: 'PUT',
  //         data: { name: newValue }
  //       }).done((category) => {
  //         newCategories = this.updateCategory(newCategories, nodeID, {
  //           id: category.id,
  //           text: category.name
  //         });

  //         this.setState({ categories: newCategories });
  //       }).fail((jqXHR) => {
  //         newCategories = this.updateCategory(newCategories, nodeID, { text: oldValue });

  //         window.alert(jqXHR.responseText);
  //         this.setState({ categories: newCategories });
  //       });
  //     }

  //     this.setState({
  //       categories: newCategories,
  //       editedCategory: void 0,
  //     });
  //   }
  // }
  // onModalClose() {
  //   this.setState({ selectedUncommitted: this.state.selectedCategories });
  // }
  // onModalOk() {
  //   const { selectedUncommitted } = this.state;

  //   this.setState({ selectedCategories: selectedUncommitted });
  // }
}









      // <span>
        
      //   <Row>
      //     <Col md={6}>
      //       <div className="form-group select optional category_parent_id">
      //         <label className="select optional control-label" htmlFor="category_parent_id">Корневая категория</label>
      //         <select className="select optional form-control" id="category_parent_id" name="category[parent_id]">
      //           <option selected="selected" value="612">Корневая категория</option>
      //           <option value="636">--Кольца</option>
      //           <option value="635">--Браслеты</option>
      //           <option value="616">--Браслет-нить</option>
      //           <option value="637">--Серьги</option>
      //           <option value="638">--На тело</option>
      //           <option value="639">--На шею</option>
      //           <option value="1443">--Дисконт</option>
      //           <option value="617">--Sale</option>
      //           <option value="629">--Леска</option>
      //           <option value="626">--Торговое оборудование</option>
      //           <option value="692">--Кастомные коллекции</option>
      //           <option value="700">--Упаковка</option>
      //           <option value="1524">--Главная страница</option>
      //         </select>
      //       </div>
      //     </Col>
      //     <Col md={6}>
      //       <div className="form-group integer optional category_position">
      //         <label className="integer optional control-label" htmlFor="category_position">Позиция в списке</label>
      //         <input className="numeric integer optional form-control" id="category_position" name="category[position]" step="1" type="number" value="0" />
      //       </div>
      //     </Col>
      //   </Row>
      // </span>