import React, { PropTypes } from 'react';

export default function SelectedCategoryItem(props) {
  SelectedCategoryItem.propTypes = {
    category: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  return ({
    props,

    onRemove(ev) {
      const { category: { id }, onRemove } = this.props;
      onRemove(id);
    },
    
    render() {
      return (
        <li>
          <span className="label label-default">
            <span>{this.props.category.text}</span>
            <i className="fa fa-times" onClick={this.onRemove.bind(this)} />
          </span>
        </li>
      );
    },
  });
}
