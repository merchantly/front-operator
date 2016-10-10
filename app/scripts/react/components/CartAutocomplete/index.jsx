import React, { Component, PropTypes } from 'react';
import CartAutocompleteRows from './CartAutocompleteRows';
import { merge } from 'lodash';

class CartAutocomplete extends Component {
  constructor(props) {
    super(props);
    const items = (props.cart || [])
      .map((item) => merge(item.good, {
        cartAmount: item.selling_by_weight ? parseFloat(item.weight) : parseInt(item.count, 10),
        selling_by_weight: item.selling_by_weight,
      }));

    this.state = { items };
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }
  componentDidMount() {
    const {
      addRow,
      goodAutocompleteFormatResult,
      props: {
        queryOptions,
      },
    } = this;

    $(this.refs.input.getDOMNode()).select2({
      placeholder: 'Найти товар',
      minimumInputLength: 1,
      ajax: {
        url: gon.operator_api_url + '/v1/goods/autocomplete.json',
        dataType: 'json',
        quietMillis: 250,
        data: (query) => ({ queryOptions, query }),
        results: (data) => ({ results: data.items }),
        cache: true,
      },
      formatResult: goodAutocompleteFormatResult,
      escapeMarkup: (m) => m,
    })
    .on('change', (e) => {
      if(e.added != null) {
        addRow(e.added);
      }
    });
  }
  addRow(item) {
    this.setState({ items: [...this.state.items, item] });
  }
  deleteRow(item) {
    this.setState({ items: this.state.items.filter(i => i !== item) });
  }
  goodAutocompleteFormatResult(good) {
    return (`
      <div class="row">
        <div class="сol-md-2 col-xs-2 col-sm-2 col-lg-2">
          <img class="img-responsive" src="${good.image.url}" />
        </div>
        <div class="сol-md-10 col-xs-10 col-sm-10 col-lg-10">
          <div class="row">
            <div class="сol-md-12 col-xs-12 col-sm-12 col-lg-12">
              ${good.title}
            </div>
          </div>
        </div>
      </div>
    `);
  }
  render() {
    const {
      items,
    } = this.state;

    return (
      <div>
        <div className="form-group">
          <input
            className='string optional form-control'
            ref='input'
            type='text'
            value=''
          />
        </div>
        <CartAutocompleteRows
          items={items}
          onRowDelete={this.deleteRow}
        />
      </div>
    );
  }
}

CartAutocomplete.propTypes = {
  cart: PropTypes.array,
  queryOptions: PropTypes.object,
};

CartAutocomplete.defaultProps = {
  cart: [],
  queryOptions: {},
};

export default CartAutocomplete;
