import React, { PropTypes } from 'react';
import HiddenSubmit from '../common/HiddenSubmit';

export default class CategoryCreateForm {
  static propTypes = {
    category: PropTypes.object.isRequired,
    parentCategory: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    parentCategoryText: PropTypes.string.isRequired,
    nameText: PropTypes.string.isRequired
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit();
  }
  render() {
    const { category, parentCategory, parentCategoryText, nameText } = this.props;

    return (
      <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <label className="col-sm-5 control-label">
            Родительская категория
          </label>
          <div className="col-lg-7">
            <input
              className="form-control"
              disabled={true}
              type="text"
              value={parentCategory.text}
            />
          </div>
        </div>
        <div className="hr-line-dashed" />
        <div className="form-group">
          <label className="col-sm-5 control-label" htmlFor="category_name">
            Название
          </label>
          <div className="col-lg-7">
            <input
              autoFocus={true}
              className="form-control"
              id="category_name"
              onChange={this.handleTextFieldChange.bind(this, 'name')}
              type="text"
              value={category.name}
            />
          </div>
        </div>
        <HiddenSubmit />
      </form>
    );
  }
  handleTextFieldChange(fieldName, ev) {
    const value = ev.target.value;
    this.props.onFieldChange(fieldName, value);
  }
}
