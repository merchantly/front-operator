import React, { Component, PropTypes } from 'react';
import CartAutocompleteRow from './CartAutocompleteRow';

class CartAutocompleteRows extends Component {
  render() {
    const {
      items,
      onRowDelete,
    } = this.props;

    return items.length > 0
      ? (
        <div>
          {items.map((item, idx) => (
            <div key={item.id}>
              <CartAutocompleteRow
                index={idx}
                item={item}
                key={idx}
                onDelete={onRowDelete.bind(null, item)}
              />
            </div>
          ))}
        </div>
      )
      : null;
  }
}

CartAutocompleteRows.propTypes = {
  items: PropTypes.array.isRequired,
  onRowDelete: PropTypes.func.isRequired,
};

export default CartAutocompleteRows;
