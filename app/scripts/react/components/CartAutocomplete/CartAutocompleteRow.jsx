/*global ThumborService */
import React, { Component, PropTypes } from 'react';

const IMAGE_WIDTH = '150'
const IMAGE_HEIGHT = '150';

class CartAutocompleteRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartAmount: this.props.item.cartAmount || 1,
    };
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
  }
  handleChangeAmount(ev) {
    this.setState({ cartAmount: ev.target.value });
  }
  render() {
    const {
      item: {
        image,
        title,
        ident,
        global_id,
        id,
        selling_by_weight: isWeight,
      },
      index,
      onDelete,
    } = this.props;
    const {
      cartAmount,
    } = this.state;

    return (
      <div className="row">
        <div className="сol-md-2 col-xs-2 col-sm-2 col-lg-2">
          <img
            className="img-responsive"
            src={ThumborService.image_url(image.url, `${IMAGE_WIDTH}x${IMAGE_HEIGHT}`)}
          />
        </div>
        <div className="сol-md-9 col-xs-9 col-sm-9 col-lg-9">
          <div className="сol-md-6 col-xs-6 col-sm-6 col-lg-6">
            {title}
          </div>
          <div className="сol-md-2 col-xs-2 col-sm-2 col-lg-2">
            <em>
              {ident}
            </em>
          </div>
          <div className="сol-md-2 col-xs-2 col-sm-2 col-lg-2">
            <input
              className="form-control"
              name={`operator_order[goods][${index}][${isWeight ? 'weight' : 'count'}]`}
              onChange={this.handleChangeAmount}
              step={isWeight ? 0.01 : 1}
              type="number"
              value={cartAmount}
            />
            <input
              name={`operator_order[goods][${index}][good_id]`}
              type="hidden"
              value={global_id}
            />
            <input
              name={`operator_order[goods][${index}][id]`}
              type="hidden"
              value={id}
            />
          </div>
          <div className="сol-md-1 col-xs-1 col-sm-1 col-lg-1">
            <i className="fa fa-close" onClick={onDelete} />
          </div>
        </div>
      </div>
    );
  }
}

CartAutocompleteRow.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

CartAutocompleteRow.defaultProps = {

};

export default CartAutocompleteRow;

/*
window.CartAutocompleteRow = React.createClass
  render: ->
    inputName = if @props.item.selling_by_weight then "operator_order[goods][#{@props.index}][weight]" else "operator_order[goods][#{@props.index}][count]"
    goodName = "operator_order[goods][#{@props.index}][good_id]"
    cartIdName = "operator_order[goods][#{@props.index}][id]"
    stateName = if @props.item.selling_by_weight then 'cartWeight' else 'cartCount'
    step = if @props.item.selling_by_weight then 0.01 else 1
    `<div className='row'>
      <div className='сol-md-2 col-xs-2 col-sm-2 col-lg-2'>
        <img className='img-responsive' src={this.props.item.image.url} />
      </div>
      <div className='сol-md-9 col-xs-9 col-sm-9 col-lg-9'>
        <div className='сol-md-6 col-xs-6 col-sm-6 col-lg-6'>
          {this.props.item.title}
        </div>
        <div className='сol-md-2 col-xs-2 col-sm-2 col-lg-2'>
          <em>{this.props.item.ident}</em>
        </div>
        <div className='сol-md-2 col-xs-2 col-sm-2 col-lg-2'>
          <input type='number' step={step} className='form-control' name={inputName} valueLink={this.linkState(stateName)} />
          <input type='hidden' name={goodName} value={this.props.item.global_id} />
          <input type='hidden' name={cartIdName} value={this.props.item.id} />
        </div>
        <div className='сol-md-1 col-xs-1 col-sm-1 col-lg-1'>
          <i className='fa fa-close' onClick={ this.props.onDelete } />
        </div>
      </div>
    </div>`

*/
